# Prince Urban Knot — Frontend

A full-featured men's neckties and accessories e-commerce storefront built with React. Live product browsing by category, multi-image product detail pages, cart management, order history, and JWT-based authentication.

**Live Demo:** [prince-urban-knot-frontend.vercel.app](https://prince-urban-knot-frontend.vercel.app)  
**Backend Repo:** [prince-urban-knot-backend](https://github.com/jagdeep2001kainth/prince-urban-knot-backend)

---

## Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Framework  | React 18 (Vite)                |
| Routing    | React Router v6                |
| State      | React Context API (Auth, Cart) |
| Styling    | Custom CSS                     |
| Auth       | JWT stored in localStorage     |
| Image CDN  | Cloudinary                     |
| Deployment | Vercel                         |

---

## Features

- **Category navigation** — 9 product categories fetched on demand from the backend; homepage is a static hero with zero product load on initial render (solves free-tier cold-start latency)
- **Product grid** — hover image swap between primary and secondary Cloudinary images per product
- **Product detail page** — thumbnail switcher across 3 images, stock quantity display, quantity selector capped at available stock, add to cart
- **Cart drawer** — persistent cart state via Context API, quantity management, order placement
- **Authentication** — register/login with JWT, role-aware routing (`PrivateRoute`, `AdminRoute`)
- **Admin bulk upload** — CSV upload tool for batch-creating products (v3 endpoint, supports 3 images per product)
- **Responsive design** — mobile-aware layout

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Category nav, auth state, brand
│   ├── ProductList.jsx     # Product card with hover image swap
│   ├── Cart.jsx            # Cart drawer
│   ├── PrivateRoute.jsx    # Auth guard (any logged-in user)
│   └── AdminRoute.jsx      # Auth guard (ADMIN role only)
├── pages/
│   ├── Home.jsx            # Hero page + category product grid
│   ├── ProductPage.jsx     # Product detail with image switcher
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Orders.jsx
│   └── AdminBulkUploadV3.jsx  # Multi-image CSV bulk upload
├── context/
│   ├── AuthContext.jsx     # JWT token + user role state
│   └── CartContext.jsx     # Cart items state
├── services/
│   └── api.js              # All fetch calls to Spring Boot backend
└── App.jsx                 # Route definitions
```

---

## Architecture Decisions

**Hero homepage instead of product grid on load**  
Loading 122 products with eager-fetched image collections on every homepage visit caused 4+ second delays on free-tier infrastructure. Replacing the homepage with a static hero image eliminates the cold product fetch entirely — categories load products only when explicitly navigated to.

**Category-based routing via query params**  
`/?category=Animal Print Tie Set` pattern keeps category state in the URL (shareable, bookmarkable, browser back/forward works correctly) without needing a separate route per category.

**Dual image fields on Product**  
Each product has a legacy `imageUrl` (single string, used by product cards for fast rendering) and an `imageUrls` list (3 Cloudinary URLs, used by the product detail page thumbnail switcher). This avoids breaking existing components while supporting the richer detail page UI.

**Role-based route guards**  
`AdminRoute` reads `user.role` from `AuthContext`, which is populated from the login API response. The JWT also carries the role claim server-side, verified independently by `JwtFilter` on every protected request.

---

## Local Development

```bash
# Clone
git clone https://github.com/jagdeep2001kainth/prince-urban-knot-frontend
cd prince-urban-knot-frontend

# Install
npm install

# Set environment variable
echo "VITE_API_URL=http://localhost:8080/api" > .env.local

# Run
npm run dev
```

Requires the backend running locally or pointed at the live Render URL.

---

## Environment Variables

| Variable       | Description                             |
| -------------- | --------------------------------------- |
| `VITE_API_URL` | Base URL of the Spring Boot backend API |

---

## Deployment

Deployed on **Vercel** via GitHub integration. Every push to `main` triggers an automatic redeploy. Environment variables configured in Vercel's project settings.
