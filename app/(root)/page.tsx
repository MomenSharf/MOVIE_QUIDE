import MovieCard from "@/components/MovieCard";
import Scroll from "@/components/Scroll";
import { get10 } from "@/lib/api";
import { fetchUser } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {


  const user = await currentUser();
  if (!user || (user && user.id != "user_2hkcdFPnx3OWjGSQihZK17OS1uH"))
    return <div className="text-xl">Sorry</div>;

  let userInfo = null;
  if (user) userInfo = await fetchUser(user.id);

  const PopularMovies = await get10("movie", 1, "popular", userInfo);
  const PupularTVShows = await get10("tv", 1, "popular", userInfo);
  const nowPlayingMovies = await get10("movie", 1, "now_playing", userInfo);
  const UpcamingMovies = await get10("movie", 1, "upcoming", userInfo);
  

  return (
    <section className="w-full mt-5 flex flex-col gap-10">
        <Scroll
          title="Poplular | Movies"
          link="/movies?sort_by=popularity.desc"
        >
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

        <Scroll
          title="Upcomin | Movies"
          link="/movies?sort_by=upcoming.desc"
        >
          {UpcamingMovies}
        </Scroll>
        {/* <MoviesListSlider
          title="Poplular | Movies"
          link="/movies?sort_by=popularity.desc"
        >
          {PopularMovies}
        </MoviesListSlider>
        <MoviesListSlider
          title="Poplular | TV Shows"
          link="/tv-shows?sort_by=popularity.desc"
        >
          {PupularTVShows}
        </MoviesListSlider>
        <MoviesListSlider
          title="New Playing | Movies"
          link="/movies?sort_by=now_playing.desc"
        >
          {nowPlayingMovies}
        </MoviesListSlider>

        <MoviesListSlider
          title="Upcomin | Movies"
          link="/movies?sort_by=upcoming.desc"
        >
          {UpcamingMovies}
        </MoviesListSlider> */}
    </section>
  );
}
