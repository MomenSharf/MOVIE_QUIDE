import FilterDropDown from "@/components/FilterDropDown";
import GenresDropDown from "@/components/GenresDropDown";
import LoadMore from "@/components/LoadMore";
import Search from "@/components/Search";
import { discover, search } from "@/lib/api";
import { fetchUser } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    sort_by?: string;
    page?: number;
    with_genres?: number | string;
    query?: string;
  };
}) {
  const user = await currentUser();

  if (!user || (user && user.id != "user_2hkcdFPnx3OWjGSQihZK17OS1uH"))
    return <div className="text-xl">Sorry</div>;

  let userInfo = null;
  if (user) userInfo = await fetchUser(user.id);

  const query = searchParams?.query;

  const movies = query
    ? await search("movie", query)
    : await discover(
        "movie",
        searchParams,
        userInfo
      );

  return (
    <main className="w-full mt-5 flex flex-col">
      <Search />
      <div
        className={`self-end flex gap-5 my-5 items-center overflow-hidden ${
          query ? "h-0" : ""
        }`}
      >
        <GenresDropDown type="movie" />
        <FilterDropDown type="movie"/>
      </div>
      <section className="wrapper">{movies}</section>
      {!query && <LoadMore params={searchParams} type="movie" user={userInfo} />}
    </main>
  );
}
