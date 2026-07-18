# Quick Start - School ERP Platform

Get the demo running in under 2 minutes.

## Prerequisites
- Node.js 18+ installed
- npm or yarn installed

## Run Locally

```bash
# 1. Navigate to project
cd school-erp-platform

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Go to: http://localhost:3000
```

That's it! The demo is now running.

## Demo Navigation

### Start Here
**Landing Page**: `http://localhost:3000`
- Shows the investor-facing entry point
- Click "Platform Dashboard" to proceed

### Key Pages to Show

1. **Platform Dashboard** → `http://localhost:3000/platform`
   - Multi-school overview
   - Growth metrics
   - Click "Add New School" for onboarding flow

2. **Onboarding Wizard** → `http://localhost:3000/platform/onboard`
   - 5-minute school setup
   - Shows scalability

3. **School Dashboard** → Click any school from list
   - Individual school admin view
   - Access to all 4 modules

4. **Modules**:
   - **Admissions**: Manage applications, approve/reject
   - **Attendance**: Mark daily attendance by class
   - **Fees**: Fee structure, payment records
   - **Exams**: Schedule, marks entry, report cards

## Common Commands

```bash
# Development
npm run dev          # Start dev server on :3000

# Production Build
npm run build        # Build for production
npm start           # Run production build

# Code Quality
npm run lint        # Check for issues
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port:
npm run dev -- -p 3001
```

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Usually auto-fixed by Next.js
# If not, check tsconfig.json exists
```

## File Structure

```
school-erp-platform/
├── app/                    # Pages (Next.js App Router)
│   ├── page.tsx           # Landing page
│   ├── platform/
│   │   ├── page.tsx       # Platform dashboard
│   │   ├── onboard/       # Onboarding flow
│   │   └── school/        # Individual school views
│   └── globals.css
├── lib/                   # Utilities
│   ├── types.ts          # TypeScript types
│   └── mockData.ts       # Demo data
├── README.md             # Main documentation
├── PITCH.md             # Investor demo script
├── DEPLOYMENT.md        # Deploy to Vercel guide
└── package.json
```

## Quick Edits

### Change School Data
Edit `lib/mockData.ts`:
- Add/remove schools in `schools` array
- Modify student data
- Update fee structures

### Update Branding
Edit `app/page.tsx`:
- Change "SchoolERP" to your brand name
- Update colors in Tailwind classes
- Modify messaging

### Customize Modules
Each module is in `app/platform/school/[schoolId]/[module]/page.tsx`
- Admissions: Add custom fields
- Attendance: Change class/section logic
- Fees: Modify fee structure
- Exams: Add grading rules

## Testing Before Demo

1. **Open all key pages** - ensure no 404s
2. **Check mobile view** - responsive design
3. **Test interactions** - buttons, forms work
4. **Browser console** - no errors (F12)
5. **Read data labels** - "illustrative" notices visible

## Ready for Investors

Once running locally:
- Practice your 30-second demo flow
- Memorize key stat locations
- Have PITCH.md open as reference
- Test on projector/screen share before meeting

## Deploy to Production

When ready to share URL with investors:
```bash
# See DEPLOYMENT.md for full guide

# Quick deploy:
git init
git add .
git commit -m "Initial commit"
git push # to GitHub
# Then import to Vercel
```

## Support

- **Documentation**: See README.md
- **Investor Demo**: See PITCH.md
- **Deployment**: See DEPLOYMENT.md

---

**Need help?** Check the full README.md for detailed architecture and features.

**Ready to pitch?** See PITCH.md for demo script and talking points.

**Want to deploy?** See DEPLOYMENT.md for Vercel setup guide.
