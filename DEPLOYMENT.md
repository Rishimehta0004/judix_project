# Deployment Guide

This guide walks you through deploying both the backend and frontend of the application.

## Prerequisites

- GitHub account
- MongoDB Atlas account (for cloud database)
- Render/Railway account (for backend) OR Heroku
- Netlify/Vercel account (for frontend)
- Google Cloud Console project (with OAuth credentials)

---

## Part 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Whitelist IP addresses (allow from anywhere: `0.0.0.0/0` for testing)
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

---

## Part 2: Deploy Backend (Choose one platform)

### Option A: Deploy to Render (Recommended - Free tier available)

1. **Create Account**: Go to [Render](https://render.com) and sign up

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**:
   - **Name**: `task-manager-backend` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Environment Variables**: Add the following in the "Environment" tab
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-strong-secret-key>
   JWT_EXPIRES_IN=7d
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   FRONTEND_URL=<will-update-after-frontend-deployment>
   ```

5. **Deploy**: Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://task-manager-backend.onrender.com`

### Option B: Deploy to Railway

1. Go to [Railway](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables (same as above)
5. Set root directory to `backend`
6. Deploy and note the URL

### Option C: Deploy to Heroku

1. Install Heroku CLI: `brew tap heroku/brew && brew install heroku`
2. Login: `heroku login`
3. Create app:
   ```bash
   cd backend
   heroku create task-manager-backend
   ```
4. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=<your-mongodb-uri>
   heroku config:set JWT_SECRET=<your-secret>
   heroku config:set GOOGLE_CLIENT_ID=<your-client-id>
   heroku config:set GOOGLE_CLIENT_SECRET=<your-client-secret>
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

---

## Part 3: Deploy Frontend (Choose one platform)

### Option A: Deploy to Netlify (You already have netlify.toml!)

1. **Create Account**: Go to [Netlify](https://www.netlify.com) and sign up

2. **Deploy via GitHub**:
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure build settings:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `frontend/.next`

3. **Environment Variables**: Add in Site settings → Build & deploy → Environment
   ```
   NEXT_PUBLIC_API_URL=<your-backend-url>/api/v1
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-google-client-id>
   ```
   Example: `NEXT_PUBLIC_API_URL=https://task-manager-backend.onrender.com/api/v1`

4. **Deploy**: Netlify will automatically deploy
   - Note your frontend URL: `https://your-app-name.netlify.app`

5. **Update Backend CORS**: Go back to Render/Railway and update:
   ```
   FRONTEND_URL=https://your-app-name.netlify.app
   ```

### Option B: Deploy to Vercel (Great for Next.js!)

1. Go to [Vercel](https://vercel.com) and sign up
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=<your-backend-url>/api/v1
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-google-client-id>
   ```
6. Deploy and note the URL
7. Update backend's `FRONTEND_URL` environment variable

---

## Part 4: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Click on your OAuth 2.0 Client ID
5. Update **Authorized JavaScript origins**:
   ```
   https://your-frontend-url.netlify.app
   ```
6. Update **Authorized redirect URIs**:
   ```
   https://your-frontend-url.netlify.app
   https://your-frontend-url.netlify.app/login
   ```
7. Save changes

---

## Part 5: Test Your Deployment

1. Visit your frontend URL
2. Test registration with email/password
3. Test login with email/password
4. Test Google OAuth login
5. Create, edit, delete tasks
6. Test filtering and search
7. Check task statistics

---

## Part 6: Push to GitHub

```bash
# Create a new repository on GitHub (don't initialize with README)
# Then run these commands from your project root:

git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Troubleshooting

### Backend Issues

**CORS Error**:
- Ensure `FRONTEND_URL` in backend matches your deployed frontend URL exactly
- No trailing slash in URLs

**MongoDB Connection Error**:
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string is correct
- Ensure username/password are URL-encoded

**Google OAuth Not Working**:
- Verify Google Client ID and Secret are set correctly
- Check authorized origins in Google Console
- Ensure HTTPS is used in production

### Frontend Issues

**API Connection Error**:
- Verify `NEXT_PUBLIC_API_URL` points to correct backend URL
- Include `/api/v1` in the URL
- Check if backend is running

**Environment Variables Not Loading**:
- Ensure variable names start with `NEXT_PUBLIC_`
- Rebuild and redeploy after changing env vars
- Variables must be set at build time for Next.js

**Google Sign-In Not Showing**:
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set
- Check browser console for errors
- Ensure domain is authorized in Google Console

---

## Quick Deployment Checklist

- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] Backend deployed (Render/Railway/Heroku)
- [ ] Backend environment variables configured
- [ ] Frontend deployed (Netlify/Vercel)
- [ ] Frontend environment variables configured
- [ ] Backend updated with frontend URL (CORS)
- [ ] Google OAuth origins updated with production URLs
- [ ] Application tested in production
- [ ] Code pushed to GitHub with clean commit history
- [ ] README updated with deployment links

---

## Recommended Free Tier Stack

- **Database**: MongoDB Atlas (512MB free)
- **Backend**: Render (750 hours/month free)
- **Frontend**: Netlify or Vercel (100GB bandwidth/month free)
- **Domain**: Use provided subdomain or connect custom domain

---

## Production URLs Structure

After deployment, your URLs will look like:
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://task-manager-backend.onrender.com`
- **API**: `https://task-manager-backend.onrender.com/api/v1`

Update your README with these URLs once deployed!
