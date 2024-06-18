import Link from "next/link";
import React from "react";
import BookmarkTag from "./BookmarkTag";
import { MotionDiv } from "./useMotion";
import { getimdbObject } from "@/lib/api";

export default async function MovieCard({
  movie,
  index,
  user,
}: {
  movie: Movie;
  index: number;
  user: any;
}) {
  let isBookmarked = false;
  if (user) {
    isBookmarked = Boolean(
      user.bookmarked.find((e: Movie) => e.id == movie.id)
    );
  }

  const variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1}
  }

  const type: 'movie' | 'tv' = movie.name ? "tv" : 'movie'

  const imdbObject =  await getimdbObject(movie.id, type)
  

  return (
    <MotionDiv
    variants={variants}
    initial='hidden'
    animate="visible"
    transition={{
      delay: index * 0.2,
      ease:"easeInOut",
      duration: 0.1
    }}
    viewport={{amount: 0}}
     className="relative overflow-hidden rounded-md group">
      <Link
        href={`discover/${type}/${movie.id}`}
        className="overflow-hidden transition-opacity duration-300 whitespace-nowrap z-10"
      >
        <div className="h-full">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title}
            className="object-cover"
          />
        </div>
        {/* <div
          className="absolute text-xs bottom-2 left-2 p-0.5 rounded-sm group-hover:opacity-0 transition-opacity"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(141 205 162 / 0.6), rgb(4 180 227 / 0.6))",
          }}
        >
          TMDB {movie.vote_average.toFixed(1)}
        </div> */}
        <div className="absolute flex gap-2 justify-center leading-[2.3rem] bsolute text-xs bottom-2 left-2 p-0.5 rounded-sm group-hover:opacity-0 transition-opacity h-6">
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                fill="#f5c518"
                d="M4 7c-1.103 0-2 .897-2 2v6.4c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2H4Zm1.4 2.363h1.275v5.312H5.4V9.362Zm1.962 0H9l.438 2.512.287-2.512h1.75v5.312H10.4v-3l-.563 3h-.8l-.512-3v3H7.362V9.362Zm8.313 0H17v1.2c.16-.16.516-.363.875-.363.36.04.84.283.8.763v3.075c0 .24-.075.404-.275.524-.16.04-.28.075-.6.075-.32 0-.795-.196-.875-.237-.08-.04-.163.275-.163.275h-1.087V9.362Zm-3.513.037H13.6c.88 0 1.084.078 1.325.237.24.16.35.397.35.838v3.2c0 .32-.15.563-.35.762-.2.2-.484.288-1.325.288h-1.438V9.4Zm1.275.8v3.563c.2 0 .488.04.488-.2v-3.126c0-.28-.247-.237-.488-.237Zm3.763.675c-.12 0-.2.08-.2.2v2.688c0 .159.08.237.2.237.12 0 .2-.117.2-.238l-.037-2.687c0-.12-.043-.2-.163-.2Z"
              />
            </svg>
            {imdbObject?.imdbRating}
          </div>
        <div className="absolute top-2 left-2 text-xs flex gap-0.5 items-center">
          {type === 'tv' ? (
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
    </MotionDiv>
  );
}
