import AccordionUi from "@/components/AccordionUi";
import BookmarkTag from "@/components/BookmarkTag";
import { fetchMovieAndTVDetails, getimdbObject } from "@/lib/api";
import { MovieDetails } from "@/lib/types/movie";
import { TVShowDetails } from "@/lib/types/tv";
import { fetchUser } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";

export default async function page({
  params,
}: {
  params: { id: ["movie" | "tv", number] };
}) {
  const user = await currentUser();
  if (!user || (user && user.id != "user_2hkcdFPnx3OWjGSQihZK17OS1uH"))
    return <div className="text-xl">Sorry</div>;

  let userInfo = null;
  if (user) userInfo = await fetchUser(user.id);

  const movieTV: MovieDetails | TVShowDetails = await fetchMovieAndTVDetails(
    params.id[0],
    params.id[1]
  );

  const imdbObject = await getimdbObject(params.id[1], params.id[0]);

  let isBookmarked = false;
  if (user) {
    isBookmarked = Boolean(
      userInfo?.bookmarked.find((e: Movie) => e.id == movieTV.id)
    );
  }

  return (
    <>
      <div
        className="w-full min-h-screen bg-no-repeat bg-left-top fixed top-0 left-0"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${movieTV.backdrop_path}")`,
          backgroundSize: "100%",
        }}
      ></div>
      <div
        className="flex flex-col text-white mt-[18vh] sm:mt-[30vh] md:mt-[40vh] relative z-10 bg-semi-dark p-5"
        style={{ boxShadow: "0px -5px 11px 7px #10141E" }}
      >
        <div className="flex gap-3 relative -top-14 items-center">
          {"name" in movieTV && (
            <span className="text-primary font-bold text-md">
              {movieTV.seasons.length} Season
            </span>
          )}
          <span className="text-sm">
            {"title" in movieTV
              ? movieTV.release_date
              : movieTV.first_air_date?.split("-")[0] +
                "-" +
                movieTV.last_air_date?.split("-")[0]}
          </span>
          <span className="flex gap-2 justify-center leading-[3rem]">
            <svg
              width="3rem"
              height="3rem"
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
          </span>
        </div>
        <div className="flex gap-7">
          <div className="min-w-[167px] rounded-md overflow-hidden relative">
            <img
              src={`https://image.tmdb.org/t/p/w780/${movieTV.poster_path}`}
              alt=""
            />
            {user && (
              // <div className="absolute top-2 left-2 z-10">

              <BookmarkTag
                userId={user.id}
                movie={movieTV}
                bookmarked={isBookmarked}
                />
                
            )}
          </div>
          <div>
            <h2 className="font-semibold mb-5 mt-5">
              {"title" in movieTV ? movieTV.title : movieTV.original_name}
            </h2>
            <p className="text-sm">{movieTV.overview}</p>
          </div>
        </div>
        <div className="mt-5">
          {/* {'name' in movieTV && <AccordionUi data={movieTV.seasons}  />} */}
        </div>
        <div className="flex flex-col gap-3 p-5 m-5 bg-dark-blue rounded-md">
          <table>
            <tr className="mb-5">
              <td className="text-[#5A698F] font-bold p-3">RATING</td>
              <td className="flex items-center gap-3">
                <span
                  className="p-1 w-fit rounded-md text-xs"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(141, 205, 162, 0.6), rgba(4, 180, 227, 0.6))",
                  }}
                >
                  TMDB {movieTV.vote_average.toFixed(1)}
                </span>
                <span className="flex gap-2 justify-center leading-[3rem]">
                  <svg
                    width="3rem"
                    height="3rem"
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
                </span>
              </td>
            </tr>
            <tr className="pb-5">
              <td className="text-[#5A698F] font-bold p-3">CENERS</td>
              <td>{movieTV.genres.map((e) => e.name).join(" | ")}</td>
            </tr>
            <tr className="mb-5">
              <td className="text-[#5A698F] font-bold p-3">RUNTIME</td>
              <td>
                {"title" in movieTV
                  ? movieTV.runtime
                  : movieTV.episode_run_time}
                min
              </td>
            </tr>
            <tr className="mb-5">
              <td className="text-[#5A698F] font-bold p-3">AGE RATING</td>
              <td>{imdbObject.Rated}</td>
            </tr>
            <tr className="mb-5">
              <td className="text-[#5A698F] font-bold p-3">
                PRODUCTION COUNTRY
              </td>
              <td>
                {"title" in movieTV
                  ? movieTV.production_countries.map((e) => e.name).join(" | ")
                  : movieTV.origin_country}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
