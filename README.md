# CineSage - Premium Movie Discovery

Live Demo: [https://imdb-clone-99.netlify.app/](https://imdb-clone-99.netlify.app/)

A sophisticated movie discovery platform built with Next.js 16, featuring curated content from TMDB with an emphasis on quality curation and user watchlists.

## Features

- **Trending Discovery**: Browse currently trending movies globally
- **Top Rated Collection**: Explore critically acclaimed masterpieces
- **Movie Details**: In-depth movie information with high-quality imagery
- **Personal Watchlist**: Save movies to your personal watchlist (session-based)
- **Editorial Curation**: Featured spotlights and philosophical content
- **Responsive Design**: Optimized for all devices with Tailwind CSS
- **Server-Side Rendering**: Fast page loads with Next.js App Router
- **Static Site Generation**: Optimized caching with revalidation

## Tech Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **React**: 19.2.4
- **Styling**: Tailwind CSS 4
- **Database**: Neon Serverless PostgreSQL
- **ORM**: Drizzle ORM 0.45
- **API**: TMDB (The Movie Database)
- **Language**: TypeScript 5
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 24+ installed
- npm or yarn package manager

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/rudrakumar2012/imdb-clone.git
   cd imdb-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see `.env.local`):
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API keys
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

The project uses Drizzle ORM with migrations stored in `drizzle.config.ts`. To push schema changes:

```bash
npx drizzle-kit push:pg
```

## Environment Variables

Create a `.env.local` file with the following:

```env
TMDB_API_KEY=your_tmdb_api_key_here
DATABASE_URL=postgresql://username:password@host/db?sslmode=require
```

- `TMDB_API_KEY`: Get from [TMDB](https://www.themoviedb.org/settings/api)
- `DATABASE_URL`: Your Neon PostgreSQL connection string

## Deployment

This project is configured for deployment on Netlify with continuous deployment from GitHub.

### Netlify Build Configuration

- **Build command**: `npm run build`
- **Publish directory**: `.next/standalone`
- **Node.js version**: 24.x

The `netlify.toml` file contains all necessary build settings. Environment variables must be configured in the Netlify dashboard.

### Setting Up Environment on Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings → Build & deploy → Environment → Environment variables**
3. Add:
   - `TMDB_API_KEY` = your API key
   - `DATABASE_URL` = your Neon database URL
4. Trigger a new deploy

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── about/page.tsx     # About page
│   ├── editorial/page.tsx # Editorial content
│   ├── layout.tsx         # Root layout
│   ├── movie/[id]/page.tsx # Movie details
│   ├── page.tsx           # Homepage
│   └── watchlist/page.tsx # User watchlist
├── actions/               # Server actions
│   └── watchlist.ts       # Watchlist CRUD operations
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── EditorialSections.tsx
│   ├── FocusCardsContainer.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
└── lib/                   # Utilities & configs
    ├── db.ts              # Database connection
    ├── schema.ts          # Drizzle schema
    ├── tmdb.ts            # TMDB API functions
    └── utils.ts           # Helper functions
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for their amazing movie database API
- [Next.js](https://nextjs.org/) for the fantastic React framework
- [Neon](https://neon.tech/) for serverless PostgreSQL
