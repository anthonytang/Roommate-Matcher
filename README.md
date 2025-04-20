# Roommate Matcher

A Next.js + Prisma + Celery/Redis application to help students find their ideal roommates by answering a short survey and ranking question categories. The app precomputes pairwise similarity scores in the background and presents each user’s top 10 best matches.

---

## 🚀 Features

- **Questionnaire**: On‑campus or off‑campus survey, plus category importance ranking (1–10).  
- **Matching Algorithm**: Custom weighted 1‑norm, 2‑norm, and (weighted) cosine‑similarity computation in Python/Celery.  
- **Background Precomputation**: Celery Beat schedules similarity recalculation every 5 minutes.  
- **Real‑time UI**: Polls `/api/matches` until your matches are ready, then shows your top 10.  
- **Profile Modal**: View detailed roommate profiles in a full‑screen, blurred‑background modal.

---

## 📁 Repository Structure

/
├─ .env                     # Environment variables (DATABASE_URL, REDIS_URL, etc.)
├─ .gitignore               # Files and folders to ignore in Git
├─ components.json          # shadcn UI component configuration
├─ dump.rdb                 # Redis persistence file
├─ eslint.config.mjs        # ESLint configuration
├─ middleware.ts            # Next.js middleware (Clerk auth gating)
├─ next-env.d.ts            # Next.js TypeScript definitions
├─ next.config.ts           # Next.js configuration
├─ package-lock.json        # Auto‑generated npm lockfile
├─ package.json             # Project metadata & dependencies
├─ postcss.config.mjs       # PostCSS configuration (for Tailwind CSS)
├─ README.md                # Project overview & setup instructions
├─ tsconfig.json            # TypeScript compiler options
│
├─ app/                     # Next.js app directory (App Router)
│  ├─ api/
│  │  ├─ graphql/           # GraphQL API endpoint
│  │  │  └─ route.ts        # Handles GraphQL requests
│  │  └─ matches/           # Matches REST API endpoint
│  │     └─ route.ts        # GET /api/matches logic (reads Redis cache, polls status)
│  │
│  ├─ dashboard/            # User dashboard page
│  │  └─ page.tsx           # Main dashboard UI
│  │
│  ├─ signin/               # Clerk authentication pages
│  │  └─ [[...index]]/
│  │     └─ page.tsx        # Sign-in / sign-up fallback
│  │
│  ├─ globals.css           # Tailwind CSS global styles
│  ├─ layout.tsx            # Root layout (nav, providers, etc.)
│  └─ page.tsx              # Home / landing page
│
├─ celery_tasks/            # Background job definitions (Python/Celery)
│  ├─ celery_config.py      # Celery + Beat scheduler config
│  └─ matching.py           # Matching/Similarity algorithm + Redis/Celery logic
│
├─ components/              # Shared React components
│  ├─ Account.tsx           # Account page component
│  ├─ AutoLogoutProvider.tsx# Auto‑logout on inactivity
│  ├─ ClientProviders.tsx   # Apollo/Clerk providers wrapper
│  ├─ Hero.tsx              # Landing page hero section
│  ├─ ItemListInput.tsx     # Tag‑style list input component
│  ├─ Matches.tsx           # Matches page component
│  ├─ Navbar.tsx            # Sidebar navigation
│  ├─ Questions.tsx         # Survey question page
│  ├─ useInactivityTimeout.tsx # Custom hook for auto‑logout
│  └─ UserModal.tsx         # Modal for viewing another user’s profile
│
├─ graphql/                 # GraphQL schema, resolvers & queries
│  ├─ mutations.ts          # GraphQL mutation definitions
│  ├─ queries.ts            # GraphQL query definitions
│  ├─ resolvers.ts          # Server-side resolver functions
│  └─ schema.ts             # GraphQL schema definition
│
├─ lib/                     # Utility code & client setup
│  ├─ apolloClient.ts       # Apollo Client initialization
│  └─ utils.ts              # Miscellaneous helper functions
│
├─ prisma/                  # Prisma ORM schema & migrations
│  ├─ migrations/           # Auto‑generated database migration files
│  ├─ schema.prisma         # Database schema & models
│  └─ seed.ts               # Seed script to populate initial data
│
├─ public/                  # Static assets served by Next.js
│  ├─ catantrackerlogo.png  # Logo image
│  ├─ file.svg              # Example SVG
│  ├─ globe.svg             # Example SVG
│  ├─ google_svg.png        # Google logo
│  ├─ logo-white.png        # White‑version logo
│  ├─ logo.png              # Primary logo
│  ├─ next.svg              # Next.js logo
│  ├─ vercel.svg            # Vercel logo
│  └─ window.svg            # Example SVG
│
└─ venv/                    # Python virtual environment for Celery tasks
   ├─ bin/                  # Executables (python, pip, celery, etc.)
   ├─ include/              # C headers for compiled extensions
   ├─ lib/                  # Python libraries
   ├─ share/                # Shared data
   └─ pyvenv.cfg            # Virtualenv configuration

---

## 🛠️ Prerequisites

- **Node.js** ≥18  
- **npm** or **yarn** or **pnpm**  
- **MySQL** (or another DB; configure `DATABASE_URL`)  
- **Redis** running on localhost:6379 (for Celery broker & cache)  
- **Python 3.9+** with virtualenv (for Celery tasks)  

---

## 🔧 Local Development

1. **Install dependencies**  
   ```bash
   npm install
   # or yarn

2. **Configure environment** 
Copy `.env.example` to `.env` and fill in:
    ```DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DB"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
    CLERK_SECRET_KEY="..."
    PYTHON_DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DB_NAME"
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

3. **Set up Prisma** 
    ```npx prisma migrate dev     # create your database schema
    npm run prisma:seed        # populate sample data (if any)

4. **Run Redis & Celery** 
In one terminal:
    ```celery -A celery_config worker --loglevel=info
In another:
    ```celery -A celery_config beat --loglevel=info

5. **Start Next.js** 
    ```npm run dev

6. **Visit** 
Open http://localhost:3000 in your browser.

## 📦 Production
    ```npm run build
    npm start
Ensure your production environment has the same env vars, and run both the Celery worker & beat alongside your Next.js server.

## 👥 Team & Contributions
Member 1    🔧 Bootstrapped Next.js project; established GitHub repo;
Member 2    🤖 Designed and implemented the matching/similarity algorithm in Python/Celery.
Member 3    🔍 Researched & selected optimal survey questions; crafted presentation slides.
Member 4    🔍 Researched & selected optimal survey questions; crafted presentation slides.

## 📖 Further Reading
Next.js: https://nextjs.org/docs

Prisma: https://www.prisma.io/docs

Celery: https://docs.celeryproject.org/

Clerk (Auth): https://docs.clerk.com/

Tailwind CSS: https://tailwindcss.com/docs

Thank you for using Roommate Matcher! 
