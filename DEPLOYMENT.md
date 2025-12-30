# Deployment Guide

This guide will help you deploy your Fabula Ultima Combat Tracker so others can access it via a link.

## Option 1: Vercel (Recommended - Easiest)

Vercel offers free hosting for static sites with automatic deployments.

### Steps:

1. **Create a GitHub repository** (if you haven't already)
   - Go to https://github.com/new
   - Create a new repository
   - Push your code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/fabula-combat-tracker.git
     git push -u origin main
     ```

2. **Deploy with Vercel**
   - Go to https://vercel.com
   - Sign up with your GitHub account
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - You'll get a URL like: `https://fabula-combat-tracker.vercel.app`

### Updates:
Every time you push to GitHub, Vercel will automatically redeploy!

---

## Option 2: Netlify

Netlify is another great free hosting option.

### Steps:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to https://netlify.com
   - Sign up for free
   - Drag and drop the `dist` folder onto Netlify
   - You'll get a URL like: `https://random-name-123.netlify.app`
   - You can customize the subdomain in settings

### Automatic Deployments:
Connect your GitHub repository in Netlify settings for automatic deployments.

---

## Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

### Steps:

1. **Update vite.config.ts**
   
   Add the base path (replace `your-repo-name` with your actual repo name):
   
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/fabula-combat-tracker/', // Your repo name
   })
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json**
   
   Add this to the `scripts` section:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Save

Your site will be available at: `https://YOUR_USERNAME.github.io/fabula-combat-tracker/`

---

## Option 4: Cloudflare Pages

Another free option with excellent performance.

### Steps:

1. **Create a GitHub repository** (see Option 1)

2. **Deploy with Cloudflare Pages**
   - Go to https://pages.cloudflare.com
   - Sign up for free
   - Click "Create a project"
   - Connect your GitHub account
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`
   - Click "Save and Deploy"

---

## Custom Domain (Optional)

All the above services support custom domains:

1. Buy a domain (e.g., from Namecheap, Google Domains)
2. In your hosting service settings, add your custom domain
3. Update your domain's DNS settings as instructed
4. Wait for DNS propagation (can take up to 24 hours)

---

## Recommended: Vercel

For the easiest experience with automatic deployments, I recommend Vercel:
- Free forever for hobby projects
- Automatic HTTPS
- Fast global CDN
- Automatic deployments from GitHub
- Great performance
- Easy custom domain setup

Just push your code to GitHub and connect it to Vercel - it handles everything else!
