"use server";
import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";
import { connectToDB } from "./mongoose";
import { fetchUser } from "./user";
import MovieCard from "@/components/MovieCard";
import { MovieDetails } from "./types/movie";
import { TVShowDetails } from "./types/tv";

const API_KEY = process.env.API_KEY;
const API_KEY_OMDBAPI = process.env.API_KEY_OMDBAPI;
const BASE_URL = "https://api.themoviedb.org/3";

export async function get20(
  type: "movie" | "tv",
  filter: string,
  user: any
): Promise<any> {

  try {
    const response = await axios.get(`${BASE_URL}/${type}/${filter}`, {
      params: {
        api_key: API_KEY,
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
  type: "movie" | "tv" = "movie",
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
      `${BASE_URL}/discover/${type}`,
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
// TODO:
export async function search(type: "movie" | "tv" = 'movie' , query: string) {
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

export async function fetchMovieAndTVDetails(type: 'movie' | 'tv', id: number) {

  try {
    const response = await axios.get(`${BASE_URL}/${type}/${id}`, {
      params: {
        api_key: API_KEY, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching details", error);
  }
}


export async function toggleTobookmarked(
  userid: string,
  movie: MovieDetails | TVShowDetails,
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

export const getimdbObject = async (id: number, type: 'movie'|  'tv') => {

  try {

    const response = await axios.get(`${BASE_URL}/${type}/${id}/external_ids`, {
      params: {
        api_key: API_KEY, 
      }
    });

    const imdbObject = await axios.get(`http://www.omdbapi.com/?i=${response.data.imdb_id}&apikey=${API_KEY_OMDBAPI}`)
    
    return imdbObject.data
  } catch (error: any) {
    console.log(error.message);
  }


}

