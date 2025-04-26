// app/api/matches/route.ts
import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL!);

export async function GET() {
  try {
    const payload = await redis.get('precomputed_match_results');
    if (!payload) {
      return NextResponse.json({ status: 'pending' }, { status: 202 });
    }
    return NextResponse.json(JSON.parse(payload), { status: 200 });
  } catch (err) {
    console.error('Redis error:', err);
    // Return pending so the UI keeps polling (or you could return a 503)
    return NextResponse.json({ status: 'pending' }, { status: 202 });
  }
}
