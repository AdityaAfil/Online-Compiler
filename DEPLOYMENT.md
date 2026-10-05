# 🚀 Deployment Guide

## Deploy Your Online Compiler to Production

This guide will help you deploy both the frontend and backend of your online compiler.

---

## 📦 Part 1: Deploy Backend (Railway/Render)

### Option A: Deploy to Railway (Recommended - Free)

1. **Create a Railway account**: https://railway.app/

2. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

3. **Login to Railway**:
   ```bash
   railway login
   ```

4. **Deploy Backend**:
   ```bash
   cd backend
   railway init
   railway up
   ```

5. **Set Environment Variables** (in Railway dashboard):
   - `PORT=5000`
   - `NODE_ENV=production`
   - `RAPIDAPI_KEY=your_key` (optional, demo works with limits)

6. **Copy your Railway URL** (e.g., `https://your-app.railway.app`)

### Option B: Deploy to Render

1. Go to https://render.com/ and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `online-compiler-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variable:
   - Key: `RAPIDAPI_KEY`, Value: `your_key` (optional)
6. Click "Create Web Service"
7. Copy your Render URL

---

## 🌐 Part 2: Deploy Frontend (Vercel)

### Deploy to Vercel (Recommended - Free)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Update Frontend API URL**:
   
   Edit `frontend/src/App.jsx` line 163:
   ```javascript
   // Change from:
   const API_URL = 'http://localhost:5000';
   
   // To your backend URL:
   const API_URL = 'https://your-backend-url.railway.app';
   ```

3. **Deploy to Vercel**:
   ```bash
   cd frontend
   vercel
   ```

4. **Follow prompts**:
   - Set up and deploy? → Yes
   - Which scope? → Your account
   - Link to existing project? → No
   - Project name? → online-compiler
   - Directory? → ./
   - Build command? → `npm run build`
   - Output directory? → build

5. **Your app is live!** 🎉
   - Vercel will give you a URL like: `https://online-compiler.vercel.app`

---

## 🔄 Alternative: Deploy Both on Vercel

You can deploy the backend as a serverless function on Vercel too!

1. Move `backend/server.js` content to `api/compile.js`
2. Configure `vercel.json` for serverless routes
3. Deploy entire project with `vercel`

---

## 🔐 Optional: Get RapidAPI Key for Better Limits

1. Go to: https://rapidapi.com/judge0-official/api/judge0-ce
2. Sign up for free
3. Subscribe to free tier (higher rate limits)
4. Copy your API key
5. Add to backend environment variables:
   ```
   RAPIDAPI_KEY=your_actual_key_here
   ```

---

## ✅ Verification Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Frontend API_URL points to backend
- [ ] CORS enabled in backend
- [ ] Can run code successfully
- [ ] Dark/Light mode toggle works
- [ ] All 10 languages work

---

## 🐛 Common Issues

**CORS Error:**
- Make sure backend has `app.use(cors())` enabled
- Check that frontend API_URL is correct

**Code not executing:**
- Check backend logs for errors
- Verify RapidAPI key is valid (if using one)
- Try without API key (demo mode)

**Build fails:**
- Run `npm install` in both directories
- Check for any missing dependencies
- Ensure Node.js version is 14+

---

## 📱 Share Your Project

Once deployed, share your compiler:
- Add the live URL to your GitHub README
- Share on LinkedIn/Twitter
- Add to your portfolio

---

## 🎓 For Your GitHub README

Add this badge once deployed:
```markdown
🔗 **Live Demo**: [https://your-app.vercel.app](https://your-app.vercel.app)
```

---

**Need help?** Open an issue on GitHub or check the troubleshooting section in the main README.
