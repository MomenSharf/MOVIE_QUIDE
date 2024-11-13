import FilterDropDown from "@/components/FilterDropDown";
import GenresDropDown from "@/components/GenresDropDown";
import LoadMore from "@/components/LoadMore";
import Search from "@/components/Search";
import { discover, search } from "@/lib/api";
import { fetchUser } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { Spinner } from "@nextui-org/spinner";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    sort_by?: string;
    page?: number;
    with_genres?: number | string;
    query?: string;
    type: "movie" | "tv";
  };
}) {
  const user = await currentUser();

  // if (!user || (user && user.id != process.env.ONLY_MY))
  //   return <div className="text-xl">Sorry</div>;

  let userInfo = null;
  if (user) userInfo = await fetchUser(user.id);

  const query = searchParams?.query;
  const type = searchParams?.type;

  const discoverorSearch = query
    ? await search(type, query)
    : await discover(type, searchParams, userInfo);

  return (
    <main className="w-full mt-5 flex flex-col p-5">
      <Search />
      <div
        className={`self-end flex gap-5 my-5 items-center overflow-hidden ${
          query ? "h-0" : ""
        }`}
      >
        <GenresDropDown type={type} />
        <FilterDropDown type={type} />
      </div>
        <section className="wrapper">{discoverorSearch}</section>
      {!query && <LoadMore params={searchParams} type={type} user={userInfo} />}
    </main>
  );
}
