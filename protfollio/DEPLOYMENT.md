# Netlify Deployment Guide

## Prerequisites
- A Netlify account (free at netlify.com)
- Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended for first deployment)

1. **Push your code to Git**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository

3. **Configure build settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `protfollio`

4. **Set environment variables** (if needed)
   - Go to Site settings > Environment variables
   - Add:
     - `VITE_SANITY_PROJECT_ID`: `rksihl2j`
     - `VITE_SANITY_DATASET`: `production`

5. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   # Build the project
   npm run build
   
   # Deploy to Netlify
   netlify deploy --prod --dir=dist
   ```

## Configuration Files

### netlify.toml
This file is already configured with:
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables for Sanity
- SPA redirects for React Router

### Environment Variables
The following environment variables are configured:
- `VITE_SANITY_PROJECT_ID`: Your Sanity project ID
- `VITE_SANITY_DATASET`: Your Sanity dataset name

## Post-Deployment

1. **Custom Domain** (Optional)
   - Go to Site settings > Domain management
   - Add your custom domain

2. **Environment Variables** (if not set during deployment)
   - Go to Site settings > Environment variables
   - Add the Sanity environment variables

3. **Continuous Deployment**
   - Every push to your main branch will trigger a new deployment
   - You can configure branch deployments in Site settings

## Troubleshooting

### Build Errors
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (check `.nvmrc` if present)
- Verify all environment variables are set

### Runtime Errors
- Check browser console for JavaScript errors
- Verify Sanity API credentials
- Check network requests in browser dev tools

### 404 Errors
- The `netlify.toml` includes SPA redirects for React Router
- If you're still getting 404s, check the redirect configuration

## Useful Commands

```bash
# Build locally to test
npm run build

# Preview build locally
npm run preview

# Check Netlify status
netlify status

# View deployment logs
netlify logs
```

## Support
- Netlify Documentation: https://docs.netlify.com
- React Router with Netlify: https://reactrouter.com/en/main/start/overview#deployment
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html 