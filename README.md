# MA ELEGANCE — Full-Stack E-commerce

A complete MA ELEGANCE store with a React/Vite storefront and a Python FastAPI backend.

## Stack

- Frontend: React 19 + Vite + Tailwind CSS
- Backend: FastAPI + SQLAlchemy
- Database: SQLite by default (easy local setup; can be switched to PostgreSQL/MySQL later)
- Authentication: Bearer-token admin authentication
- Orders: Server-side order creation with stock validation and inventory updates
- Admin: Products, inventory, orders, statuses and sales dashboard

## Run on Windows

### 1. Start backend first

Open Terminal 1:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python seed.py
python -m uvicorn app:app --reload --port 8000
```

Backend: http://localhost:8000
API health check: http://localhost:8000/api/health

### 2. Start frontend

Open Terminal 2 in the project root:

```powershell
npm install
npm run dev
```

Store: http://localhost:5173
Admin: http://localhost:5173/admin/login

### Demo admin

Email: `admin@maelegance.pk`
Password: `MAELEGANCE@123`

**Change the admin password and JWT secret in `backend/.env` before putting the store online.**

## What is now server-side

- Product catalog
- Product creation/edit/delete
- Inventory/stock
- Admin authentication
- Customer orders
- Order status
- Order totals/sales dashboard
- Stock reduction when an order is placed
- Stock restoration when an order is cancelled

The browser cart is only a temporary shopping basket. The authoritative order and inventory data live in the backend database.

## Production deployment

For a live store, deploy the FastAPI backend and database separately from the static frontend. Set `VITE_API_URL` to the HTTPS API URL, configure a production database, HTTPS, a strong JWT secret and a non-demo admin password. Do not use SQLite for a high-traffic production deployment.

## Production deployment
See `DEPLOYMENT.md` for PostgreSQL, Cloudinary, Render and Vercel setup.
