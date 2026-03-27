const TMDB_API_KEY = process.env.TMDB_API_KEY;
// Using api.tmdb.org as it is sometimes unblocked by ISPs that block api.themoviedb.org
const BASE_URL = 'https://api.tmdb.org/3';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
}

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Connection Timeout (Check ISP)",
    poster_path: null,
    backdrop_path: null,
    overview: "Your network provider is currently blocking the TMDB API, resulting in a connection timeout. Please use a VPN or proxy.",
    vote_average: 0
  }
];

export async function getTrendingMovies(page = 1): Promise<Movie[]> {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000), // Prevent 10s silent hang
    });
    if (!res.ok) throw new Error('Failed to fetch trending movies');
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.warn("Trending fetch failed, falling back to mock data.", error);
    return mockMovies;
  }
}

export async function getTopRatedMovies(page = 1): Promise<Movie[]> {
  try {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error('Failed to fetch top rated movies');
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.warn("Top rated fetch failed, falling back to mock data.", error);
    return mockMovies;
  }
}

export async function getMovie(id: string): Promise<Movie | null> {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn("Movie details fetch failed.", error);
    return { ...mockMovies[0], id: Number(id) };
  }
}

export async function getMoviesByIds(ids: number[]): Promise<Movie[]> {
  try {
    const promises = ids.map(id =>
      fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      }).then(res => res.ok ? res.json() : Promise.reject(null))
    );
    const results = await Promise.all(promises);
    return results.filter((movie): movie is Movie => movie !== null);
  } catch (error) {
    console.warn("Fetch movies by IDs failed.", error);
    return [];
  }
}
