import React from "react";
import BackButton from "../components/BackButton";

const ProfilePage = () => {
  return (
    <div className="flex flex-col flex-grow items-center p-4 bg-[#F5F5DC]">
      <BackButton />
      <div className="my-5 mx-auto max-w-3xl ">
        <h1 className="text-xl ">Profile Details</h1>
        <div className="flex  border-2 border-gray-900 bg-slate-300 rounded-md items-center justify-center hover:bg-red-300 cursor-pointer ">
          <h1 className="mt-1">Books you liked</h1>
        </div>
      </div>

      <div />
    </div>
  );
};

export default ProfilePage;
