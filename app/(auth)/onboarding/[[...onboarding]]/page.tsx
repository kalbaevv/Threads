import React from "react";
import AccountProfile from "@/components/forms/AccountProfile/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

async function page() {
  const user = await currentUser();

  const userInfo = {
    id: "1",
    _id: "2",
    username: "isken",
    name: "isken",
    bio: "hello world",
    image: "https://www.pinterest.it/pin/31032684925809559/",
  };

  // const userData: User = {
  //   id: userInfo?.id || "",
  //   // objectId: userInfo?._id || "",
  //   username: userInfo?.username || "",
  //   name: userInfo?.name || "",
  //   // bio: userInfo?.bio || "",
  //   imageUrl: userInfo?.image || "",
  // };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <div className="text-light-1  head-text">Welcome to onboarding</div>
      <p className="mt-3 text-base-regular text-light-1">
        Complete your profile now to use threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={user} btnTitle={"continue"} />
      </section>
    </main>
  );
}

export default page;
