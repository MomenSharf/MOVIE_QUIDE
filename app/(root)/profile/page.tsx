import Profile from "@/components/Profile";
import { currentUser } from "@clerk/nextjs/server";

export default async function page() {
  const user = await currentUser();

  if (!user || (user && user.id != process.env.ONLY_MY))
    return <div className="text-xl">Sorry</div>;
  
  return <Profile type="profile" />;
}
