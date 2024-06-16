import Link from "next/link";
import React from "react";
import BookmarkTag from "./BookmarkTag";

export default async function MovieCard({
  movie,
  index,
  user,
}: {
  movie: Movie;
  index: number;
  user: User | null;
}) {
  let isBookmarked = false;
  if (user) {
    isBookmarked = Boolean(
      user.bookmarked.find((e: Movie) => e.id == movie.id)
    );
  }

  return (
    <div className="relative overflow-hidden rounded-md group">
      <Link
        href={`/movies/${movie.id}`}
        className="overflow-hidden transition-opacity duration-300 whitespace-nowrap z-10"
      >
        <div className="h-full">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title}
            className="object-cover"
          />
        </div>
        <div
          className="absolute text-xs bottom-2 left-2 p-0.5 rounded-sm group-hover:opacity-0 transition-opacity"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(141 205 162 / 0.6), rgb(4 180 227 / 0.6))",
          }}
        >
          TMDB {movie.vote_average.toFixed(1)}
        </div>
        <div className="absolute top-2 left-2 text-xs flex gap-0.5 items-center">
          {movie.name ? (
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                fill="#FFF"
                opacity=".75"
              />
            </svg>
          ) : (
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                fill="#FFF"
                opacity=".75"
              />
            </svg>
          )}
          {movie.name ? "TV Show" : "Movie"}
        </div>
        <div className="absolute -bottom-10 left-0 bg-black bg-opacity-30 w-full p-2 text-center text-xs group-hover:bottom-0 transition-all">
          {movie.title ? movie.title : movie.name}
        </div>
      </Link>
      {user && <BookmarkTag userId={user.id} movie={movie} bookmarked={isBookmarked} />}
    </div>
  );
}
