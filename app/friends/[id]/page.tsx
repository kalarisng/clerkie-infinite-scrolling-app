import React from "react";
import frienddata from "../data.json";

const Page = ({ params }: { params: { id: string } }) => {
  const number = parseInt(params.id, 10);
  const friend = frienddata[number - 1];

  return (
    <div className="flex flex-col justify-center mx-auto h-auto mt-20 border rounded-3xl border-gray-300 w-1/2 shadow-sm">
      <header className="flex justify-center items-center w-auto bg-sidebar-blue font-bold text-lg text-white h-20 rounded-tl-3xl rounded-tr-3xl">
        {friend.name}
      </header>
      {friend.tag ? (
        <div className="flex flex-row justify-between mt-10">
          <span className="flex items-start pl-5 font-semibold">Tag</span>
          <span
            className={`flex items-center rounded-xl w-auto text-center font-semibold h-6 px-3 mr-5 ${
              friend.tag === "Close Friends"
                ? "bg-close-friends-bg text-close-friends-tag"
                : "bg-super-close-friends-bg text-super-close-friends-tag"
            }`}
          >
            {friend.tag}
          </span>
        </div>
      ) : null}
      <div className="flex flex-row justify-between mt-10">
        <span className="flex items-start pl-5 font-semibold">Phone</span>
        <span className="flex items-end pr-5">{friend.phone}</span>
      </div>
      <div className="flex flex-row justify-between mt-10 pb-10">
        <span className="flex items-start pl-5 font-semibold">Email</span>
        <span className="flex items-end pr-5">{friend.email}</span>
      </div>
    </div>
  );
};

export default Page;
