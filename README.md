Pastebin Lite Assignment

Overview
This project is a production ready Pastebin Lite application built using Next.js App Router and Upstash Redis.
It satisfies all functional, API, and persistence requirements described in the assignment PDF.

Features
- Create text pastes
- Shareable URLs
- Optional TTL expiry
- Optional view count limits
- Deterministic time handling for automated testing
- Serverless safe Redis persistence
- Clean API and minimal UI

Tech Stack
- Next.js 14 App Router
- Node.js
- Upstash Redis (KV persistence)
- Deployed on Vercel

Persistence Layer
Upstash Redis is used as the persistence layer.
It is serverless friendly and survives across requests, which is required for Vercel deployments.

Local Setup Instructions

Prerequisites
- Node.js 18 or above
- An Upstash Redis database

Steps
1. Clone the repository
2. Install dependencies
   npm install

3. Create a .env.local file with the following values

   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

4. Run the development server
   npm run dev

5. Open http://localhost:3000 in your browser

Deployment
- Push this repository to GitHub
- Import the project into Vercel
- Set the same environment variables in Vercel
- Deploy

