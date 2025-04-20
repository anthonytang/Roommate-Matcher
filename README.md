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

/ ├─ app/ # Next.js App Router pages & layouts │ ├─ api/ │ │ └─ matches/route.ts # /api/matches serverless handler │ └─ globals.css # Tailwind entrypoint ├─ components/ # Shared React components │ ├─ UserModal.tsx │ └─ MatchListItem.tsx ├─ celery_config.py # Celery + Beat scheduler config ├─ celery_tasks/ # Background job definitions │ └─ matching.py # precompute_matches task ├─ prisma/ # Prisma schema & seed scripts ├─ public/ # Static assets ├─ graphql/ # GraphQL queries & mutations ├─ package.json ├─ tsconfig.json ├─ tailwind.config.js └─ README.md # ← you are here


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

Configure environment
Copy .env.example to .env and fill in:

dotenv
Copy
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DB"
CELERY_BROKER_URL="redis://localhost:6379/0"
CELERY_RESULT_BACKEND="redis://localhost:6379/1"
CLERK_PUBLISHABLE_KEY="pk_..."
NEXT_PUBLIC_CLERK_FRONTEND_API="..."
Set up Prisma

bash
Copy
npx prisma migrate dev     # create your database schema
npm run prisma:seed        # populate sample data (if any)
Run Redis & Celery
In one terminal:

bash
Copy
celery -A celery_config worker --loglevel=info
In another:

bash
Copy
celery -A celery_config beat --loglevel=info
Start Next.js

bash
Copy
npm run dev
Visit
Open http://localhost:3000 in your browser.

📦 Production
bash
Copy
npm run build
npm start
Ensure your production environment has the same env vars, and run both the Celery worker & beat alongside your Next.js server.

👥 Team & Contributions
Team Member Role & Contributions
Member 1    🔧 Bootstrapped Next.js project; established GitHub repo; UI & Clerk integration.
Member 2    🤖 Designed and implemented the matching/similarity algorithm in Python/Celery.
Member 3    🔍 Researched & selected optimal survey questions; crafted presentation slides.
Member 4    🔍 Researched & curated survey content; led presentation design and copy.
All team members reviewed and agreed on these attributions.

📖 Further Reading
Next.js: https://nextjs.org/docs

Prisma: https://www.prisma.io/docs

Celery: https://docs.celeryproject.org/

Clerk (Auth): https://docs.clerk.com/

Tailwind CSS: https://tailwindcss.com/docs

Thank you for using Roommate Matcher! Feel free to open issues or submit PRs on GitHub.
