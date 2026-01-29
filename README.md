# Dartmouth Authentication Demo

A Firebase-based authentication system that restricts login to Dartmouth email addresses (@dartmouth.edu). Our final project is intended to be restricted to users with Dartmouth emails, so this is our demo of how to achieve that feature.

## Features

**Dartmouth Email Restriction**: Only @dartmouth.edu emails can sign in
**Multiple Auth Methods**: Google sign-in or email/password
**Secure Dashboard**: Redirects to dashboard after successful login
**Session Management**: Automatic logout for non-Dartmouth accounts

## How to Run

### Option 1: Using Python

1. Open a terminal in the project directory
2. Run the following command:
   ```bash
   python3 -m http.server 8000
   ```
3. Open your browser and navigate to: `http://localhost:8000`

### Option 2: Using VSCode Live Server

1. Install the "Live Server" extension in VSCode
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your browser will automatically open the application

### Option 3: Using Node.js

1. Install a simple HTTP server globally:
   ```bash
   npm install -g http-server
   ```
2. Run the server:
   ```bash
   http-server -p 8000
   ```
3. Open your browser and navigate to: `http://localhost:8000`

## How to Use

### Sign Up (New Users)
1. Enter your @dartmouth.edu email
2. Create a password (minimum 6 characters)
3. Click "Sign Up (Create Account)"
4. You'll be redirected to the dashboard

### Sign In (Existing Users)
1. Enter your @dartmouth.edu email and password
2. Click "Sign In"
3. You'll be redirected to the dashboard

### Sign In with Google
1. Click "Sign in with Google"
2. Select your Dartmouth Google account
3. You'll be redirected to the dashboard

### Reset Password
1. Enter your email in the email field
2. Click "Set / Reset Password"
3. Check your email for the password reset link

## Security Features

- Only @dartmouth.edu emails are allowed
- Non-Dartmouth accounts are automatically logged out
- Dashboard requires valid Dartmouth authentication
- Session verification on page load

## Files

- `index.html` - Login page
- `dashboard.html` - Dashboard page (requires authentication)
- `main.js` - Login page logic
- `dashboard.js` - Dashboard logic
- `README.md` - This file


## Who Did What
Jamie worked on the Firebase initial setup and basic (no CSS) code; Neha fixed connectivity issues and made it pretty

## What We Learned/How It Relates
Our intention was to learn how to ensure that only users with legitimate Dartmouth emails could sign up, and we think we were able to accomplish that! That's one roadblock out of the way. Also, we learned how to navigate Firebase, which will probably be helpful if we want to host our site there (or somewhere similar)

## What Didn't Work
There were some issues in making sure Gmail accounts also became email/password accounts because Firebase doesn't allow you to immediately set a password after signing in with Google. We may need to find a workaround of this, or only have the Sign In with Google button...
