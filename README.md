# 📚 Cookbook Archive

A personal cookbook and recipe archive — a small React app I built to keep track of which recipes I love and which cookbook they live in. This repo is the **portfolio demo version**: no accounts, no backend, no network. All data lives in memory and resets the moment you reload the page, so visitors can poke around without leaving a trace.

🌐 **[Live Demo](https://cookbookarchive.vercel.app)**

> **Note:** An earlier version of this app was backed by Supabase auth and Postgres. That backend is no longer maintained — the current code runs entirely client-side from a seeded in-memory store.

## ✨ Features

- 📖 **Cookbook collection** — add, edit, delete, and favorite cookbooks
- 🍳 **Recipe management** — full CRUD with ingredients, instructions, source, and notes
- ❤️ **Favorites** — flag any cookbook or recipe and surface them on a dedicated page
- 📅 **Weekly meal planner** — let the app suggest a random recipe per day, or cycle through your library
- 📱 **Barcode scanning** — scan a cookbook's ISBN with your camera (or paste one) to auto-fill title/author/description via Open Library + Google Books
- 📊 **Stats overview** — see how many cookbooks, recipes, and favorites are in the demo at a glance
- 🎨 **Warm glass-morphism UI** — soft gradients, blur, peach/brown palette
- 📱 **Fully responsive** — mobile-first layout with a hamburger nav under 768px

## 🛠️ Tech stack

- **React 19** + **TypeScript 5.8**
- **Vite 6** for dev and build
- **React Router 7** (data router via `RouterProvider`)
- **Tailwind CSS 4** + a small hand-written CSS layer for the bespoke pieces
- **React Context** for state (no Redux/Zustand)
- **react-hot-toast** for notifications
- **@zxing/browser** + **@zxing/library** for ISBN scanning
- **axios** for the ISBN lookup (Open Library → Google Books fallback)
- **@vercel/analytics** for page-view tracking on the live demo

## 🚀 Getting started

### Prerequisites
- Node.js v18 or higher
- npm (or your package manager of choice)

### Installation

```bash
git clone https://github.com/eskmag/cookbook-archive.git
cd cookbook-archive
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and you're in. No `.env` file, no Supabase setup, nothing else to configure.

## 🧪 What you can try in the demo

1. The app opens on a dashboard pre-seeded with 3 cookbooks and 6 recipes.
2. Add a new cookbook (try the **Scan Barcode** button if your machine has a webcam — the ISBN lookup still works against public APIs).
3. Add, edit, and delete recipes on the Recipes page.
4. Hit the heart icon on anything; check the **Favorites** page.
5. Open the **Meal Planner** — *Suggest a Meal* picks a random recipe for that day, *Choose Meal* cycles through your library.
6. Reload the page. Everything resets back to the seeded demo state.

## 🌐 Deployment

The demo is hosted on Vercel. Because there's no backend anymore, deploying is trivial:

```bash
npm run build
# upload dist/ to any static host
```

On Vercel: import the repo, accept the defaults, deploy. No environment variables required.

## 🔧 Development

### Available scripts

```bash
npm run dev      # Vite dev server with HMR
npm run build    # tsc -b && vite build
npm run preview  # serve the production build locally
npm run lint     # ESLint
```

### Project structure

```
src/
├── components/          # Reusable UI components
│   ├── AddCookbookForm.tsx
│   ├── AddRecipeForm.tsx
│   ├── BarcodeScanner.tsx
│   ├── CookbookCard.tsx
│   ├── MealCard.tsx
│   ├── RecipeCard.tsx
│   ├── SkeletonCard.tsx
│   └── UserProfile.tsx   # repurposed as the About page
├── context/             # In-memory state stores
│   ├── CookbookContext.tsx
│   └── RecipeContext.tsx
├── data/                # Seed data loaded on startup
│   ├── cookbook.ts
│   └── recipes.ts
├── pages/               # Route components
│   ├── HomePage.tsx
│   ├── FavoritesPage.tsx
│   ├── AllCookbooksPage.tsx
│   ├── BookDetail.tsx
│   ├── EditCookbook.tsx
│   ├── RecipePage.tsx
│   ├── RecipeDetail.tsx
│   ├── EditRecipe.tsx
│   └── MealPlannerPage.tsx
├── services/
│   └── bookService.ts   # ISBN → book metadata lookup
├── App.tsx              # Layout: sticky header, nav, <Outlet/>
├── main.tsx             # Router + providers + Toaster
└── index.css            # Tailwind + custom CSS
```

### How the in-memory store works

Both `CookbookContext` and `RecipeContext` initialize `useState` from the arrays in `src/data/`. CRUD operations mutate that local state with `useState` setters and an incrementing-id `useRef`. All methods still return `Promise<void>` so the rest of the app didn't need to change when the Supabase backend was ripped out.

That means:
- Refresh the page → state resets to the seed data.
- Open the app in two tabs → each tab has its own independent state.
- Closing the tab loses any changes — by design.

## 📱 Barcode scanning & ISBN lookup

The barcode scanner still works because it calls public APIs only:

1. Click **Scan Barcode** when adding a cookbook.
2. Grant camera access and frame the book's ISBN barcode.
3. The detected ISBN is looked up first via Open Library, then falling back to Google Books.
4. Title, author, and description auto-fill — edit or save as-is.

You can also paste an ISBN manually and click **Lookup**.

## 🗺️ Roadmap (for the personal copy, not this demo)

The original app had plans for image uploads, recipe sharing, PDF export, and a dark theme. Those features remain on the wish list for a future, backend-equipped version — they're not in scope for this portfolio showcase.

## 📝 License

MIT — see [LICENSE](LICENSE).

---

Made with a love for cooking by [Eskil](https://github.com/eskmag)

*Happy cooking and recipe organizing!*
