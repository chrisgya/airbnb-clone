import getCurrentUser from "@/app/utilities/currentUser";
import React from "react";

async function ProfilePage() {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-col gap-4 p-4 mx-4 rounded-md sm:mx-8 md:mx-auto md:max-w-screen-md bg-slate-50">
      <h1>User Info</h1>
      <hr />
      <p>
        Name: <span className="font-bold">{currentUser?.name}</span>
      </p>
      <p>
        Email: <span className="font-bold">{currentUser?.email}</span>
      </p>
      <p>
        Date Created:{" "}
        <span className="font-bold">
          {currentUser?.createdAt.toDateString()}
        </span>
      </p>
      <p>
        Email Verified:{" "}
        <span className="font-bold">
          {currentUser?.emailVerified ? "Yes" : "No"}
        </span>
      </p>
    </div>
  );
}

export default ProfilePage;
