# Building a Next.js Song Library with Direct API Integration

For this task, I developed `next-quikdb`, a Next.js application that showcases a song library with a custom API endpoint. This post explores my design decisions, API integration strategy, challenges faced, and key takeaways from the process, culminating in a production-ready solution.

## Design Choices

I opted for Next.js’s App Router with TypeScript for type safety and Tailwind CSS for responsive, utility-first styling. The app structure uses `src/app` for pages and API routes, with `components` (`SongCard.tsx`, `SongList.tsx`) for modularity. The homepage (`page.tsx`) displays 20 songs in a paginated grid (5 per page), styled with Tailwind for a clean, mobile-friendly UI. Each song includes a title, artist, image, and audio player via HTML5 `<audio>` tags. The API route (`route.ts`) serves song data with in-memory rate limiting, aligning with the task’s security requirement.

## API Integration

Initially, I used `fetch('/api/songs')` in the `Home` Server Component to retrieve song data from `/api/songs`. However, this led to a "Failed to parse URL" error in SSR due to Node.js’s inability to resolve relative URLs without a base context. To fix this, I adopted a direct approach: importing and calling the `GET` handler from `route.ts` within `Home`. A mock `Request` object satisfies the handler’s signature, allowing an internal function call instead of an HTTP request. This returns a `NextResponse`, which I parse to get the `Song[]` array. The `SongList` Client Component then handles pagination with `useState`, balancing server-side efficiency with client-side interactivity.

## Challenges Encountered

The `fetch` error was a significant hurdle, exposing the nuances of Server Components and relative URLs. Switching to a direct `GET` call resolved this but required understanding Next.js’s internal routing. External image domains triggered a `next/image` error, fixed by adding them to `next.config.js`. Rate limiting persisted in-memory, resetting on server restarts—a limitation for production scale. Deployment also demanded rethinking `localhost` references, though the direct call sidestepped this elegantly.

## Key Learnings

- **Server Components Shine**: Direct API calls in Server Components eliminate network overhead, a powerful Next.js feature.
- **Tailwind’s Speed**: It enabled rapid, responsive design without custom CSS.
- **API Security**: Basic rate limiting is a start, but persistence (e.g., Redis) would enhance it.
- **Debugging Insight**: Errors like URL parsing highlight the importance of server vs. client context.

This project demonstrates Next.js’s versatility for full-stack apps. Deployed on Vercel, it’s a solid foundation for QuikDB’s song library vision!
