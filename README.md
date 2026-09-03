# FLEX-Grow Academy

Enterprise Learning & Talent Mobility Platform — an interactive prototype covering the full loop of *Learn → Build Skills → Get Matched → Work on Projects → Build Portfolio → Advance Your Career*.

Built with React + Vite + Tailwind CSS, using `lucide-react` for icons and `recharts` for charts. Everything is client-side state — there is no backend — so completing a course, applying to a gig, having a manager approve it, and completing the project all update the UI live in the same session.

## What's included

22 screens across four role views (switch roles from the top bar dropdown "Viewing as"):

- **Login**, **Employee Dashboard**, **My Learning**, **Course Catalog**, **Learning Paths**, **Course Detail**, **Course Player**, **Internal Gigs**, **Gig Detail**, **AI Talent Matching**, **My Applications**, **My Projects**, **Skills & Competencies**, **Career Path**, **My Portfolio**, **Career Profile (Talent Profile)**, **Mentors**, **Webinars**, **Notifications**, **Settings**
- **Manager**: Team Overview, Skill Gaps, Team Learning, Talent Recommendations, Applications Management
- **HR / Talent Admin**: HR Dashboard, Gig Management, Skill Gap Analysis, Applications Management

## Demo script

1. Sign in (any credentials work — it's a prototype).
2. On the Employee Dashboard, open **Customer Data Dashboard** from Internal Gigs and click **Apply for Project**.
3. Switch "Viewing as" to **Manager**, go to **Applications** (under Talent Mobility), and **Approve** Sarah's application.
4. Switch back to **Employee**, go to **My Projects**, and click **Mark Project Complete**.
5. Check **My Portfolio** and the dashboard's Career Readiness ring — both update automatically.
6. Also try: clicking **Continue** on a course in "Continue Learning" advances progress and, once it hits 100%, adds a new skill and a notification.

## Local development

```bash
npm install
npm run dev
```

## Build for production

```bash
npm install
npm run build
```

Output goes to `dist/`.

## Deploy to Netlify

**Option A — Drag and drop (fastest):**
Run `npm install && npm run build` locally, then drag the generated `dist` folder into Netlify's "Deploy manually" area on your team's Sites page.

**Option B — Connect a Git repo:**
Push this folder to GitHub/GitLab/Bitbucket, then in Netlify choose "Add new site → Import an existing project" and select the repo. `netlify.toml` already sets the build command (`npm run build`) and publish directory (`dist`), so no manual configuration is needed.

**Option C — Netlify CLI:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## Project structure

```
flexgrow-academy/
├── index.html
├── netlify.toml
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx      # React entry point
    ├── App.jsx       # Entire application (routing, state, all pages, mock data)
    └── index.css     # Tailwind + FLEX-Grow design tokens
```

All UI is intentionally kept in a single `App.jsx` for easy exploration; it's organized top-to-bottom as mock data → UI atoms → layout (Sidebar/Topbar) → Login → root `App` → individual page components.
