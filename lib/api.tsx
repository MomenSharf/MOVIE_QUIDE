"use server";
import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";
import { connectToDB } from "./mongoose";
import { fetchUser } from "./user";
import MovieCard from "@/components/MovieCard";

const API_KEY = "87fc3483d84b44e35885d199ba0c4f36";
const BASE_URL = "https://api.themoviedb.org/3";

export async function get10(
  type: "movie" | "tv",
  page: number,
  filter: "popular" | "now_playing" | "upcoming",
  user: any
): Promise<any> {
  const url = new URL(`${BASE_URL}/${type}/${filter}`);
  url.searchParams.append("api_key", API_KEY);

  try {
    const response = await axios.get(`${BASE_URL}/${type}/${filter}`, {
      params: {
        api_key: API_KEY,
        page: page.toString(),
      },
    });
    return response.data.results.map((movie: Movie, i: number) => {
      return <MovieCard movie={movie} key={i} index={i} user={user} />;
    });
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

export async function discover(
  type: "movie" | "tv",
  params:
    | {
        sort_by?: string | undefined;
        page?: number | undefined;
        with_genres?: string | number | undefined;
      }
    | undefined,
  user: any
) {

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/${type}`,
      {
        params: {
          api_key: API_KEY,
          ...params,
        },
      }
    );
    return response.data.results.map((movie: Movie, i: number) => {
      return <MovieCard movie={movie} key={i} index={i} user={user} />;
    });
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
    return [];
  }
}

export async function search(type: "movie" | "tv", query: string) {
  noStore();

  try {
    const response = await axios.get(`${BASE_URL}/search/${type}`, {
      params: {
        api_key: API_KEY,
        query,
      },
    });
    return response.data.results.map((movie: Movie, i: number) => {
      return <MovieCard movie={movie} key={i} index={i} user={null} />;
    });
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
    return [];
  }
}

export async function fetchMovieAndTVDetails(movieId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching details", error);
    return {};
  }
}


export async function toggleTobookmarked(
  userid: string,
  movie: Movie,
  add: boolean
) {
  connectToDB();

  try {
    const user = await fetchUser(userid);

    if (user.bookmarked) {
      if (add) {
        user.bookmarked.push(movie);
      } else {
        user.bookmarked = user.bookmarked.filter(
          (e: Movie) => e.id != movie.id
        );
      }
      user.save();
    }
  } catch (error) {
    console.error("Error add to bookmark:", error);
  }
}

export async function fetchBookcmarked(userid: string) {
  noStore();
  connectToDB();

  try {
    const user = await fetchUser(userid);

    return user.bookmarked.map((movie: Movie, i: number) => {
      return <MovieCard movie={movie} key={i} index={i} user={user} />;
    });
  } catch (error) {
    console.error("Error fetch bookmark:", error);
  }
}

// const password()