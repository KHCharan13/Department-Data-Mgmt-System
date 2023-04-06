import React from "react";

function AddUsers() {
  return (
    <div className="lg:mx-52 my-12 text-lg font-poppins ">
      <h2 className="mt-12 text-3xl font-bold text-center ">Add New Users</h2>
      <div className="flex justify-center items-center">
        <input
          className="text-center my-2 px-4 py-2 rounded-xl focus:border-b-4 transition-all duration-200 focus:border-amber-700 "
          type="text"
          placeholder="Name of the User"
        />
      </div>
      <div className="flex justify-center items-center">
        <select className="text-center my-2 px-4 py-2 rounded-xl " name="Type">
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="Non-Teaching Staff">Non Teaching</option>
        </select>
      </div>
      <div className="flex justify-center items-center">
        <input
          className="text-center my-2 px-4 py-2 rounded-xl focus:border-b-4 transition-all duration-200 focus:border-amber-700 "
          type="text"
          placeholder="ID Number/USN"
        />
      </div>
      <div className="flex justify-center items-center">
        <input
          className="text-center my-2 px-4 py-2 rounded-xl focus:border-b-4 transition-all duration-200 focus:border-amber-700 "
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="flex justify-center items-center">
        <button className="mt-8 w-24 bg-amber-400 border-2 hover:bg-white hover:border-amber-900 hover:text-black transition-all duration-300 py-2 px-4 rounded-3xl scale-110">
          Add
        </button>
      </div>
    </div>
  );
}

export default AddUsers;
