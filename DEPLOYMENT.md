# MA ELEGANCE production deployment

## 1. PostgreSQL
Create a PostgreSQL database with Neon or Supabase and copy its connection string into the backend `DATABASE_URL`.

Example:

`postgresql+psycopg://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require`

## 2. Cloudinary
Create a Cloudinary account and copy:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Product images uploaded from Admin > Products are stored in `ma-elegance/products` on Cloudinary.

## 3. Backend
Deploy `backend/` to Render (or Railway).

Build:

`pip install -r requirements.txt`

Start:

`uvicorn app:app --host 0.0.0.0 --port $PORT`

Set environment variables from `backend/.env.example`.

Set `CORS_ORIGINS` to your exact Vercel storefront URL, for example:

`https://ma-elegance.vercel.app`

## 4. Frontend
Deploy the repository to Vercel.

Set this Vercel environment variable:

`VITE_API_URL=https://YOUR-BACKEND-DOMAIN.onrender.com/api`

Do not put database, Cloudinary secret, admin password or JWT secret in Vercel.

## 5. Admin
The first backend startup creates the admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD` if it does not already exist. Passwords are stored as Argon2 hashes.

Admin URL:

`https://YOUR-STORE-DOMAIN/admin/login`

## Security notes

- Production uses PostgreSQL rather than local SQLite.
- Admin passwords are never stored in plaintext in the database.
- Admin access uses short-lived signed JWTs.
- Admin token is kept in `sessionStorage` by the current React client and expires server-side after `ACCESS_TOKEN_MINUTES`.
- Image upload requires admin authentication and enforces a 5 MB size/type limit.
- Keep all production secrets only in Render/Vercel environment settings.
- Rotate `JWT_SECRET` and admin credentials if they are ever exposed.
