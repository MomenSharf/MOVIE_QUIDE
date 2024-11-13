import MovieCard from "@/components/MovieCard";
import Scroll from "@/components/Scroll";
import { filtertagsMovie } from "@/constants";
import { discover, get20 } from "@/lib/api";
import { fetchUser } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  // if (!user || (user && user.id != "user_2hkcdFPnx3OWjGSQihZK17OS1uH"))
  //   return <div className="text-xl">Sorry</div>;

  let userInfo = null;
  if (user) userInfo = await fetchUser(user.id);

  const PopularMovies = await discover(
    "movie",
    { sort_by: "popula" },
    userInfo
  );
  const PupularTVShows = await get20("tv", "popular", userInfo);
  const nowPlayingMovies = await get20("movie", "now_playing", userInfo);
  const UpcamingMovies = await get20("movie", "upcoming", userInfo);

  return (
    <section className="w-full mt-5 flex flex-col gap-10 pl-5">
      <Scroll title="Poplular | Movies" link="/movies?sort_by=popularity.desc">
        {PopularMovies}
      </Scroll>
      <Scroll
        title="Poplular | TV Shows"
        link="/tv-shows?sort_by=popularity.desc"
      >
        {PupularTVShows}
      </Scroll>
      <Scroll
        title="New Playing | Movies"
        link="/movies?sort_by=now_playing.desc"
      >
        {nowPlayingMovies}
      </Scroll>

      <Scroll title="Upcomin | Movies" link="/movies?sort_by=upcoming.desc">
        {UpcamingMovies}
      </Scroll>
    </section>
  );
}
