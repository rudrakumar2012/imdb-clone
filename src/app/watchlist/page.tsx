import { db } from "../../lib/db";
import { watchlist } from "../../lib/schema";
import { WatchlistPageClient } from "./WatchlistPageClient";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export default async function WatchlistPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('cinesage_session')?.value;

  let savedList: any[] = [];
  if (sessionId) {
    const results = await db
      .select()
      .from(watchlist)
      .where(eq(watchlist.sessionId, sessionId))
      .orderBy(watchlist.createdAt);

    savedList = results.map(item => ({
      id: item.movieId,
      title: item.title,
      poster_path: item.posterPath,
      posterPath: item.posterPath,
      createdAt: item.createdAt,
    }));
  }

  return <WatchlistPageClient initialCards={savedList} />;
}
