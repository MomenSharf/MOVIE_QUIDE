import { fetchBookcmarked } from "@/lib/api";
import { fetchUser } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page({}) {
  const user = await currentUser();

  if (!user || (user && user.id != process.env.ONLY_MY))
    return <div className="text-xl">Sorry</div>;

  if (!user) redirect("/profile");

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/profile");

  const bookmarked = await fetchBookcmarked(userInfo.id);

  return <section className="wrapper">{bookmarked}</section>;
}
