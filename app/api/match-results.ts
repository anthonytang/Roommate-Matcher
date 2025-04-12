// pages/api/match-results.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';

// Create a Redis client instance.
// You may also load the host/port/db index from environment variables.
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  db: process.env.REDIS_DB ? Number(process.env.REDIS_DB) : 2,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the match results from Redis using the key.
    const cachedResults = await redis.get('precomputed_match_results');

    // If no results exist, send a 404 response.
    if (!cachedResults) {
      return res.status(404).json({ error: 'No match results found.' });
    }

    // Parse the JSON string to an object.
    const matchResults = JSON.parse(cachedResults);

    // Respond with the match results.
    res.status(200).json({ matches: matchResults });
  } catch (error: any) {
    console.error('Error fetching match results from Redis:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
