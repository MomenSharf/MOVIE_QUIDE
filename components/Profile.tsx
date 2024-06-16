import { fetchUser, updateUser } from "@/lib/user";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Profile({
  type,
}: {
  type: "onboarding" | "profile";
}) {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="flex w-full min-h-screen items-center flex-col">
        <h2 className="text-2xl mb-5 text-white mt-10">Please First Login</h2>
        <SignedOut>
          <SignInButton>
            {/* <ButtonUi>login</ButtonUi> */}
            <button className="btn">login</button>
          </SignInButton>
        </SignedOut>
      </div>
    );
  }

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded && type === "onboarding") redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    firstName: userInfo ? userInfo.firstName : user.firstName,
    lastName: userInfo ? userInfo?.lastName : user.lastName ?? "",
  };

  const updateUserWithId = updateUser.bind(null, user.id);

  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-16 sm:gap-0">
      <div className="sm:mb-16 cursor-pointer mt-10">
        <Link href="/">
          <svg width="33" height="27" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
              fill="#FC4747"
            />
          </svg>
        </Link>
      </div>

      <div className="text-white bg-dark-blue p-7 rounded-xl max-w-[320px] m-5">
        <h2 className="text-3xl font-normal mb-3 tracking-wide">Profile</h2>
        <form action={updateUserWithId} className="w-full">
          <input
            className="bg-transparent border-0 outline-0 border-b-2 border-b-gray-600 p-3 w-full mb-3"
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={userData.username}
          />
          <input
            className="bg-transparent border-0 outline-0 border-b-2 border-b-gray-600 p-3 w-full mb-3"
            type="text"
            name="first-name"
            placeholder="First Name"
            defaultValue={userData.firstName}
          />
          <input
            className="bg-transparent border-0 outline-0 border-b-2 border-b-gray-600 p-3 w-full mb-3"
            type="text"
            name="last-name"
            placeholder="First Name"
            defaultValue={userData.lastName}
          />
          <button className="btn w-full mt-3" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
