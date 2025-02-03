from fastapi import FastAPI, Depends, HTTPException
from starlette.requests import Request
from starlette.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
import os
import dotenv
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

dotenv.load_dotenv()

app = FastAPI()


# Initialize OAuth
oauth = OAuth()

# Register OAuth Providers
oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    access_token_url="https://oauth2.googleapis.com/token",
    client_kwargs={"scope": "openid email profile"},
)

oauth.register(
    name="github",
    client_id=os.getenv("GITHUB_CLIENT_ID"),
    client_secret=os.getenv("GITHUB_CLIENT_SECRET"),
    authorize_url="https://github.com/login/oauth/authorize",
    access_token_url="https://github.com/login/oauth/access_token",
    client_kwargs={"scope": "user:email"},
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  # Allow frontend to make requests
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store user session data (simulated session storage)
user_sessions = {}


@app.get("/auth/login/{provider}")
async def login(request: Request, provider: str):
    if provider not in oauth.clients:
        raise HTTPException(status_code=400, detail="Unsupported provider")
    redirect_uri = os.getenv("REDIRECT_URI")  # Ensure this is set in your .env file
    return await oauth.create_client(provider).authorize_redirect(request, redirect_uri)

@app.get("/auth/callback")
async def auth_callback(request: Request):
    provider = request.query_params.get("provider")
    if provider not in oauth.clients:
        raise HTTPException(status_code=400, detail="Invalid provider")

    client = oauth.create_client(provider)
    token = await client.authorize_access_token(request)

    if provider == "google":
        user_info = await client.parse_id_token(request, token)
    elif provider == "github":
        user_info = await client.get("https://api.github.com/user", token=token)
        user_info = user_info.json()

    if not user_info:
        raise HTTPException(status_code=400, detail="Failed to retrieve user info")

    # Store user session (in-memory for this example)
    session_token = token["access_token"]
    user_sessions[session_token] = {
        "id": user_info.get("sub") or user_info.get("id"),
        "name": user_info.get("name") or user_info.get("login"),
        "email": user_info.get("email"),
        "picture": user_info.get("picture") or user_info.get("avatar_url"),
        "provider": provider,
    }

    # Redirect to frontend with session token (to be used for further requests)
    return RedirectResponse(url=f"http://localhost:5174/dashboard/user?token={session_token}")


@app.get("/test")
def test():
    return {"message": "FastAPI is working!"}

@app.get("/auth/user")
async def get_authenticated_user(token: str):
    user = user_sessions.get(token)
    if not user:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return user

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
