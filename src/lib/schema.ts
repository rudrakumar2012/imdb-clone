import { pgTable, text, timestamp, varchar, integer, primaryKey } from 'drizzle-orm/pg-core';

export const watchlist = pgTable('watchlist', {
  movieId: integer('movie_id').notNull(),
  sessionId: varchar('session_id', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  posterPath: text('poster_path'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.movieId, table.sessionId] })
  };
});
