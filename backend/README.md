# MA ELEGANCE Production API

FastAPI + PostgreSQL + JWT admin authentication + Cloudinary image storage.

## Production services

- Backend: Render (or Railway/Fly)
- Database: Neon/Supabase PostgreSQL
- Images: Cloudinary
- Frontend: Vercel

## Required backend environment variables

```env
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
ADMIN_EMAIL=admin@maelegance.pk
ADMIN_PASSWORD=use-a-long-unique-password
JWT_SECRET=use-a-long-random-secret
ACCESS_TOKEN_MINUTES=30
CORS_ORIGINS=https://your-store.vercel.app
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Never commit `.env` or production credentials.

## Local

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app:app --reload --port 8000
```

## Database

Use PostgreSQL in production. The API keeps SQLite as a local fallback only.

For an existing production database, use a migration tool (Alembic) before making schema changes. Fresh deployments can start with the included SQLAlchemy table creation.
