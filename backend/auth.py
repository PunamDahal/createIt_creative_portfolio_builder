import os
import uvicorn
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse, JSONResponse
from authlib.integrations.starlette_client import OAuth
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Add session middleware for authentication handling
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SECRET_KEY", "your_default_secret_key"),
    max_age=3600,  # 1 hour for session expiry, adjust as needed
    path="/",  # Cookie should be valid across all paths
)

# OAuth configuration
oauth = OAuth()

# Google OAuth configuration
oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    access_token_url="https://oauth2.googleapis.com/token",
    client_kwargs={"scope": "openid email profile"},
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration", 
)

# GitHub OAuth configuration
oauth.register(
    name="github",
    client_id=os.getenv("GITHUB_CLIENT_ID"),
    client_secret=os.getenv("GITHUB_CLIENT_SECRET"),
    authorize_url="https://github.com/login/oauth/authorize",
    access_token_url="https://github.com/login/oauth/access_token",
    client_kwargs={"scope": "user:email"},
)

# Home route
@app.get("/")
def home():
    return {"message": "Welcome to OAuth Authentication with FastAPI"}

# Google login route
@app.get("/auth/login/google")
async def login_google(request: Request):
    redirect_uri = request.url_for("auth_google_callback")  # Generates the correct callback URL
    print(f"Google Redirect URI: {redirect_uri}")  # Debugging
    return await oauth.google.authorize_redirect(request, redirect_uri)

# Google callback route
@app.get("/auth/callback")
async def auth_google_callback(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get("userinfo")

        if not user_info:
            raise HTTPException(status_code=400, detail="Google authentication failed")

        # Store user info in session
        request.session["user"] = user_info

        # Debugging: Check the session data
        print(f"Session Data: {request.session}")

        # Redirect to the user dashboard after successful login
        return RedirectResponse(url="http://localhost:5173/dashboard/user")  # Redirect to the user dashboard
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)

# GitHub login route
@app.get("/auth/login/github")
async def login_github(request: Request):
    redirect_uri = request.url_for("auth_github_callback")
    print(f"GitHub Redirect URI: {redirect_uri}")  # Debugging
    return await oauth.github.authorize_redirect(request, redirect_uri)

# GitHub callback route
@app.get("/auth/callback")
async def auth_github_callback(request: Request):
    try:
        token = await oauth.github.authorize_access_token(request)
        user_info = await oauth.github.parse_id_token(request, token)

        if not user_info:
            raise HTTPException(status_code=400, detail="GitHub authentication failed")

        # Store user info in session
        request.session["user"] = user_info

        # Debugging: Check the session data
        print(f"Session Data: {request.session}")

        # Redirect to the user dashboard after successful login
        return RedirectResponse(url="http://localhost:5173/dashboard/user")  # Redirect to the user dashboard
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)

# Dashboard route (User dashboard)
@app.get("http://localhost:5173/dashboard/user")
async def user_dashboard(request: Request):
    user_info = request.session.get("user")


# Logout route
@app.get("/logout")
async def logout(request: Request):
    # Clear the session
    request.session.pop("user", None)
    return RedirectResponse(url="http://localhost:5173/")  # Redirect to home page after logout

# Run the app
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
