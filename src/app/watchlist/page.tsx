import { db } from "../../lib/db";
import { watchlist } from "../../lib/schema";
import { FocusCardsContainer } from "../../components/FocusCardsContainer";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export default async function WatchlistPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('cinesage_session')?.value;

  let savedList: any[] = [];
  if (sessionId) {
    savedList = await db.select().from(watchlist).where(eq(watchlist.sessionId, sessionId));
  }
  
  const cards = savedList.map(item => ({
    id: item.movieId,
    title: item.title,
    poster_path: item.posterPath,
  }));

  const watchListIds = savedList.map(item => item.movieId);

  return (
    <main className="min-h-screen bg-black">
      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto pb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white border-l-4 border-[#F5C518] pl-4">My Watchlist</h1>
        {cards.length === 0 ? (
          <div className="text-neutral-400 text-lg h-[40vh]">Your watchlist is currently empty. Discover some movies to add them here!</div>
        ) : (
          <FocusCardsContainer cards={cards} initialFavorites={watchListIds} />
        )}
      </div>
    </main>
  );
}
