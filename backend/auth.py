from fastapi import FastAPI, Depends, HTTPException
from starlette.requests import Request
from starlette.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from sqlalchemy.orm import Session
import os
from contextlib import asynccontextmanager
from database import database, User, SessionLocal, init_db

# Load environment variables
import dotenv
dotenv.load_dotenv()

app = FastAPI()

# Initialize OAuth
oauth = OAuth()

# Register OAuth Providers

oauth.register(
    name="github",
    client_id=os.getenv("GITHUB_CLIENT_ID"),
    client_secret=os.getenv("GITHUB_CLIENT_SECRET"),
    authorize_url="https://github.com/login/oauth/authorize",
    access_token_url="https://github.com/login/oauth/access_token",
    client_kwargs={"scope": "user:email"},
)

oauth.register(
    name="linkedin",
    client_id=os.getenv("LINKEDIN_CLIENT_ID"),
    client_secret=os.getenv("LINKEDIN_CLIENT_SECRET"),
    authorize_url="https://www.linkedin.com/oauth/v2/authorization",
    access_token_url="https://www.linkedin.com/oauth/v2/accessToken",
    client_kwargs={"scope": "r_liteprofile r_emailaddress"},
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Use lifespan for app startup/shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    init_db()
    yield
    await database.disconnect()

app = FastAPI(lifespan=lifespan)

@app.get("/auth/login/{provider}")
async def login(request: Request, provider: str):
    if provider not in oauth.clients:
        raise HTTPException(status_code=400, detail="Unsupported provider")
    redirect_uri = os.getenv("REDIRECT_URI")
    return await oauth.create_client(provider).authorize_redirect(request, redirect_uri)

@app.get("/auth/callback")
async def auth_callback(request: Request, db: Session = Depends(get_db)):
    provider = request.query_params.get("state")  # Determine provider from state
    client = oauth.create_client(provider)
    
    if not client:
        raise HTTPException(status_code=400, detail="Invalid provider")

    token = await client.authorize_access_token(request)

    if provider == "google":
        user_info = await client.parse_id_token(request, token)
    elif provider == "github":
        user_info = await client.get("https://api.github.com/user", token=token)
        user_info = user_info.json()
    elif provider == "linkedin":
        user_info = await client.get("https://api.linkedin.com/v2/me", token=token)
        email_info = await client.get("https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))", token=token)
        user_info = user_info.json()
        email_info = email_info.json()
        user_info["email"] = email_info["elements"][0]["handle~"]["emailAddress"]

    if not user_info:
        raise HTTPException(status_code=400, detail="Failed to retrieve user info")

    # Store user in DB
    existing_user = db.query(User).filter(User.email == user_info["email"]).first()
    
    if not existing_user:
        new_user = User(
            id=str(user_info.get("id") or user_info.get("sub")),
            name=user_info.get("name") or user_info.get("login"),
            email=user_info["email"],
            provider=provider,
            picture=user_info.get("picture") or user_info.get("avatar_url"),
        )
        db.add(new_user)
        db.commit()

    return {"message": "Login successful", "user": user_info}

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
