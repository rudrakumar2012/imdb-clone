'use server';
import { db } from '../lib/db';
import { watchlist } from '../lib/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

export async function getSessionId() {
  const cookieStore = await cookies();
  const existingSession = cookieStore.get('cinesage_session')?.value;
  if (existingSession) return existingSession;
  
  const newSessionId = randomUUID();
  cookieStore.set('cinesage_session', newSessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  return newSessionId;
}

export async function addToWatchlist(movieId: number, title: string, posterPath: string | null) {
  try {
    const sessionId = await getSessionId();
    await db.insert(watchlist).values({
      movieId,
      sessionId,
      title,
      posterPath,
    }).onConflictDoNothing();
    revalidatePath('/');
    revalidatePath('/watchlist');
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: 'Failed to add to watchlist' };
  }
}

export async function removeFromWatchlist(movieId: number) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('cinesage_session')?.value;
    if (!sessionId) return { success: false, error: 'No session' };

    await db.delete(watchlist).where(
      and(
        eq(watchlist.movieId, movieId),
        eq(watchlist.sessionId, sessionId)
      )
    );
    revalidatePath('/');
    revalidatePath('/watchlist');
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: 'Failed to remove from watchlist' };
  }
}

export async function getWatchlistIds() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('cinesage_session')?.value;
  if (!sessionId) return [];

  const list = await db.select({ movieId: watchlist.movieId })
                       .from(watchlist)
                       .where(eq(watchlist.sessionId, sessionId));
  return list.map((item) => item.movieId);
}
