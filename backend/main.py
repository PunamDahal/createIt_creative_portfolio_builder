from google.oauth2 import id_token
from google.auth.transport.requests import Request
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import os
import dotenv

# Google OAuth Client ID
GOOGLE_CLIENT_ID =os.getenv("GOOGLE_CLIENT_ID")

def verify_google_token(token: str):
    try:
        # Verify the token with the Google OAuth API
        idinfo = id_token.verify_oauth2_token(token, Request(), GOOGLE_CLIENT_ID)
        
        # If valid, return user info
        return idinfo
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google Token")

# Use this function in your login route to verify the token received from frontend
