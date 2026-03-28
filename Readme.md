# Buyer Portal

Sign up, log in, save property favourites on a dashboard.

**Needs:** Node.js, MongoDB running locally.

**Setup:** `cd backend && cp .env.sample .env` — set `MONGO_URI` and `JWT_SECRET`. Use `PORT=5001` (or change Vite proxy in `frontend/vite.config.js` to match).

**Run:**

```bash
# terminal 1
cd backend && npm install && npm start

# terminal 2
cd frontend && npm install && npm run dev
```

Then open the URL Vite shows (usually http://localhost:5173).

**Example flow:** Sign up → log in → click the heart on a listing → open **My Favourites** → log out.

Stack: Express, Mongoose, JWT in httpOnly cookie, bcrypt; React (Vite) + plain CSS.
