import React from "react";

export default function Req({ children, email, uid, name, type }) {
  return (
    <div className="bg-white flex justify-between items-center my-5 md:text-lg text-sm  p-8 shadow-xl rounded-lg">
      <div>
        <div className="flex">
          <h1 className="font-bold mr-4">Name : </h1>
          {name}
        </div>
        <div className="flex">
          <h1 className="font-bold mr-4">Email : </h1> {email}
        </div>
        <div className="flex">
          <h1 className="font-bold mr-4">Id : </h1> {uid}
        </div>
        <div className="flex">
          <h1 className="font-bold mr-4">Type of user:</h1> {type}
        </div>
      </div>
      {children}
    </div>
  );
}
