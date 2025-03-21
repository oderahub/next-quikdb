# Next QuikDB Song Library

A Next.js application built for QuikDB’s practical task, showcasing a paginated song library with a secure API endpoint.

## Features

- **Responsive UI**: Displays 20 songs (5 per page) with titles, artists, images, and audio players.
- **Pagination**: Client-side navigation using `useState` in `SongList.tsx`.
- **Secure API**: `/api/songs` route with in-memory rate limiting (10 requests/minute per IP).
- **Type Safety**: TypeScript ensures robust data handling via `Song` interface.

## Tech Stack

- **Next.js**: App Router for Server Components and API routes.
- **TypeScript**: For type definitions (`src/types/index.ts`).
- **Tailwind CSS**: Responsive styling in `globals.css`.
- **Deployment**: Vercel or DigitalOcean compatible.

## Project Structure

next-quikdb/
├── src/
│ ├── app/
│ │ ├── api/songs/route.ts # API route with GET handler
│ │ ├── page.tsx # Homepage with direct GET call
│ │ ├── layout.tsx # Root layout
│ │ └── globals.css # Tailwind styles
│ ├── components/
│ │ ├── SongCard.tsx # Single song display
│ │ └── SongList.tsx # Paginated song list
│ └── types/
│ └── index.ts # Song type definition
├── next.config.js # Image domain config
├── package.json # Dependencies
├── writeup.md # Technical blog post
└── README.md # This file

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/oderah/next-quikdb.git
   cd next-quikdb
   ```

Install dependencies:
bash

npm install

Run locally:
bash

npm run dev

Visit http://localhost:3000.
