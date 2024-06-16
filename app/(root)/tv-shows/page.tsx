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

  if (!user || (user && user.id != process.env.ONLY_MY))
    return <div className="text-xl">Sorry</div>;
  
  let userInfo = null;
  if (user) userInfo = await fetchUser(user.id);

  const query = searchParams?.query

  const tv = query
    ? await search("tv", query)
    : await discover("tv", searchParams, userInfo);

    

  return (
    <main className="w-full mt-5 flex flex-col">
    <Search />
    <div
      className={`self-end flex gap-5 my-10 items-center overflow-hidden ${ 
        query ? "h-0" : ""
      }`}
    >
      <GenresDropDown type="movie" />
      <FilterDropDown type="tv" />
    </div>
    <section className="wrapper">
      {tv}
    </section>
    {!query && <LoadMore params={searchParams} type="tv" user={userInfo} />}
  </main>
  );
}
