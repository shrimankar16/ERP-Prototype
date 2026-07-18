# Deployment Guide - SchoolERP Platform

## 🚀 Quick Deploy to Vercel (5 Minutes)

### Prerequisites
- Git installed on your machine
- GitHub account
- Vercel account (free tier works)

---

## Step 1: Push to GitHub

### If you haven't initialized Git yet:
```bash
cd school-erp-platform

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Multi-tenant School ERP Platform"

# Set main branch
git branch -M main
```

### Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `school-erp-platform` (or your choice)
3. Make it **Private** (recommended for investor demo)
4. Do NOT initialize with README (you already have one)
5. Click "Create repository"

### Push to GitHub
```bash
# Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/school-erp-platform.git

# Push to GitHub
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository `school-erp-platform`
5. Vercel will auto-detect Next.js settings
6. **Do not change any settings** - defaults are perfect
7. Click "Deploy"
8. Wait 2-3 minutes for build to complete
9. Done! You'll get a URL like `https://school-erp-platform-xxx.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel (opens browser)
vercel login

# Deploy (run from project root)
cd school-erp-platform
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? (press Enter to use folder name)
# - Directory? ./ (press Enter)
# - Override settings? No

# Production deployment
vercel --prod
```

---

## Step 3: Verify Deployment

### Test These URLs on Your Deployed Site:

1. **Landing Page**
   - URL: `https://your-app.vercel.app/`
   - Should show: Professional landing page with CTA

2. **Platform Dashboard**
   - URL: `https://your-app.vercel.app/platform`
   - Should show: 6 schools, stats, growth chart

3. **Onboarding Flow**
   - URL: `https://your-app.vercel.app/platform/onboard`
   - Should show: School onboarding wizard

4. **Single School View**
   - URL: `https://your-app.vercel.app/platform/school/school-1`
   - Should show: DPS Vasant Kunj dashboard

5. **Module Pages**
   - Admissions: `/platform/school/school-1/admissions`
   - Attendance: `/platform/school/school-1/attendance`
   - Fees: `/platform/school/school-1/fees`
   - Exams: `/platform/school/school-1/exams`

---

## 📊 Continuous Deployment

Once connected to Vercel, every push to GitHub automatically deploys:

```bash
# Make changes to code
# ... edit files ...

# Commit and push
git add .
git commit -m "Update: description of changes"
git push

# Vercel automatically builds and deploys!
# Check deployment progress at vercel.com/dashboard
```

---

## 🔧 Troubleshooting

### Build Fails with TypeScript Errors
```bash
# Run build locally first
npm run build

# Fix any errors shown
# Then commit and push again
```

### 404 Errors on Some Pages
- This shouldn't happen with App Router, but if it does:
- Check file structure matches: `app/platform/school/[schoolId]/page.tsx`
- Ensure dynamic routes use `[schoolId]` folder naming

### Slow Initial Load
- First load on free tier can be slower
- Subsequent loads are fast
- Consider upgrading Vercel plan for investor demo

### Environment Variables Needed?
Currently this demo needs NO environment variables. If you add database later:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables like `DATABASE_URL`
3. Redeploy

---

## 🎨 Custom Domain (Optional)

### Add Your Own Domain to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add domain: e.g., `demo.yourschoolerp.com`
3. Update DNS records at your domain registrar:
   - Type: `CNAME`
   - Name: `demo` (or `@` for root)
   - Value: `cname.vercel-dns.com`
4. Wait for DNS propagation (5-30 minutes)
5. Done! Access at your custom domain

**Good Domain Names for Demo:**
- `demo.yourschoolerp.com`
- `platform.yourschoolerp.com`
- `pitch.yourschoolerp.com`

---

## 📱 Preview Deployments

Vercel creates preview URLs for every branch and PR:

```bash
# Create feature branch
git checkout -b feature/new-module

# Make changes and push
git push origin feature/new-module

# Vercel creates preview URL automatically
# Find it in Vercel Dashboard or GitHub PR
```

**Use preview deployments to:**
- Test changes before merging
- Show different versions to different investors
- A/B test messaging or design

---

## 🔒 Security Settings

### Make Repository Private
- Go to GitHub repo → Settings → General
- Scroll to "Danger Zone"
- Click "Change visibility" → Private

### Restrict Vercel Access
If you want to password-protect the demo:
1. Vercel Dashboard → Project → Settings → Deployment Protection
2. Enable "Password Protection"
3. Set a password
4. Share password only with investors

**Note**: Free tier has limitations on this feature

---

## 📈 Analytics Setup (Optional)

### Add Vercel Analytics
```bash
npm install @vercel/analytics

# Add to app/layout.tsx:
import { Analytics } from '@vercel/analytics/react';

// In your root layout:
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

Track:
- Page views
- Button clicks
- Time spent on each section
- Use data to refine pitch

---

## 🔄 Update Deployed App

### Quick Updates
```bash
# Edit files locally
# Test with: npm run dev

# Commit and push
git add .
git commit -m "Update: improved stats display"
git push

# Auto-deploys in 2-3 minutes
```

### Rollback if Needed
1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

---

## 🌍 Multiple Deployment Environments

### Recommended Setup

**Production** (for live demos):
- Branch: `main`
- URL: `school-erp-platform.vercel.app`
- Quality: Polished, tested

**Staging** (for testing):
- Branch: `staging`
- URL: `school-erp-platform-staging.vercel.app`
- Quality: New features, experimental

**Create staging branch:**
```bash
git checkout -b staging
git push origin staging

# Vercel auto-creates staging deployment
```

---

## 📊 Performance Optimization

### Vercel Edge Network
Your app automatically deploys to Vercel's global CDN:
- Low latency worldwide
- Automatic caching
- No configuration needed

### If You Need Faster Loads
1. Optimize images (already using Next.js Image component)
2. Reduce JavaScript bundle size
3. Enable ISR (Incremental Static Regeneration) for static pages
4. Consider Vercel Pro plan for better edge network

---

## 💾 Backup Strategy

### GitHub is Your Backup
- Every commit is versioned
- Can restore any previous state
- Clone repo on multiple machines

### Export Vercel Project
```bash
# Clone your repo to new location
git clone https://github.com/YOUR_USERNAME/school-erp-platform.git backup-folder

# Now you have local backup
```

---

## 🎯 Pre-Investor Demo Checklist

Before sharing URL with investors:

- [ ] Test all pages load correctly
- [ ] Check mobile responsive on real phone
- [ ] Verify no console errors (F12 → Console)
- [ ] Test onboarding flow start-to-finish
- [ ] Confirm "Live Pilot" badge shows correctly
- [ ] Check that illustrative data notice is visible
- [ ] Test link sharing (send to yourself first)
- [ ] Have rollback plan if demo breaks

---

## 🚨 Emergency Fixes

### If Demo Breaks Right Before Pitch

**Plan A**: Use localhost
```bash
npm run dev
# Use local version: http://localhost:3000
```

**Plan B**: Rollback on Vercel
1. Vercel Dashboard → Deployments
2. Find last working version
3. "Promote to Production"
4. Takes 30 seconds

**Plan C**: Use GitHub Pages (static export)
- Not recommended for this app (needs server-side)
- But as absolute fallback

---

## 📞 Support

### Vercel Issues
- Docs: https://vercel.com/docs
- Support: support@vercel.com
- Status: https://vercel-status.com

### Next.js Issues
- Docs: https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js

---

## ✅ Post-Deployment Success

You should now have:
- ✅ Code on GitHub
- ✅ Live URL on Vercel
- ✅ Auto-deployment on every push
- ✅ Shareable link for investors
- ✅ Professional, fast-loading demo

**Share this URL confidently** - it's production-grade infrastructure, not a fragile prototype.

---

## 🎬 Next Steps

1. **Test thoroughly** on different devices
2. **Practice pitch** with deployed URL
3. **Share with team** for feedback
4. **Set up custom domain** (optional but impressive)
5. **Enable analytics** to see investor engagement
6. **Create video walkthrough** as backup (screen recording)

**Your demo is live! Time to pitch. 🚀**
