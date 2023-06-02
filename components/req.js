import React from "react";

export default function Req({ children, email, uid, name, type }) {
  return (
    <div className="bg-blue-100/20 my-5 md:text-lg text-sm  p-8 shadow-xl rounded-3xl">
      <div className="flex mx-[10%] justify-between">
        <div className="flex-col">
          <h1 className="font-bold">Name</h1> <h1 id="name">{name}</h1>
        </div>
        <div className="flex-col">
          <h1 className="font-bold">Email</h1> <h1 id="email">{email}</h1>
        </div>
        <div className="flex-col">
          <h1 className="font-bold">ID number</h1> <h1 id="uid">{uid}</h1>
        </div>
        <div className="flex-col">
          <h1 className="font-bold">Type of User</h1> <h1 id="type">{type}</h1>
        </div>
      </div>
      {children}
    </div>
  );
}
