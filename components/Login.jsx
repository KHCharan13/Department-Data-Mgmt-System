import Image from "next/image";
import React from "react";
import Link from "next/link";
import FaChalkboardTeacher from "react-icons/fa";
function Main() {
  return (
    <div className="w-full min-h-screen h-full text-center font-poppins">
      <div className="w-full min-h-screen h-full m-auto md:p-20 flex justify-center items-center ">
        <div className="hidden md:block text-left">
          <p className="text-4xl lg:w-[15vw] sm:w-[30vw] font-bold text-[#4B4B4B]">
            Welcome to the CSE Department User Area
          </p>
          <p className="mt-[2em] lg:w-[15vw] sm:w-[30vw] mr-[10vw] text-xl text-[#4B4B4B]">
            To request a new account just click the link below
          </p>
          <p className="mt-[2em] bg-[#dc3d3a] w-[7em] p-4 font-medium text-[white] rounded-lg hover:scale-110 hover:underline transition-all duration-500">
            <a href="/">Click here</a>
          </p>
        </div>
        <div className="bg-white hover:scale-105 transition-all duration-500 rounded-3xl lg:w-[30vw] lg:min-h-0 min-h-[70vw] min-w-[324px] md:ml-[10vw] h-[70vh] md:w-[45vw] w-[80vw] shadow-2xl shadow-[#4B4B4B]">
          <p className="text-[#4b4b4b] text-3xl font-bold text-left m-8">
            Log in
          </p>
          <p className="mx-8 mt-8 text-left">
            Enter your credentials first, you will be needing to access this
            site <br />
            <br />
            Login as:
          </p>

          <form action="">
            <input
              className="mx-1 mb-3"
              type="radio"
              name="usertype"
              id="faculty"
              value="faculty"
            />
            <label className="mx-1 mb-3 text-sm" htmlFor="faculty">
              Faculty
            </label>
            <input
              className="mx-1 mb-3"
              type="radio"
              name="usertype"
              id="student"
              value="student"
            />
            <label className="mx-1 mb-3 text-sm" htmlFor="faculty">
              Student
            </label>
            <input
              className="mx-1 mb-3"
              type="radio"
              name="usertype"
              id="non-faculty"
              value="non-faculty"
            />
            <label className="mx-1 mb-3 text-sm" htmlFor="faculty">
              Non-Faculty
            </label>

            <br />
            <input
              type="text"
              placeholder=" Username "
              className="w-[90%] p-3 my-3 bg-[#F4F4F4] rounded-2xl hover:scale-105 transition-all duration-500"
            />
            <input
              type="password"
              placeholder=" Password "
              className="w-[90%] p-3 my-3 bg-[#F4F4F4] rounded-2xl hover:scale-105 transition-all duration-500"
            />
            <a
              className="text-[#DC3D3A] my-3 text-right hover:underline hover:scale-105 transition-all "
              href="/"
            >
              Forgot Password ?
            </a>
            <br />
            <button
              className="mt-6 bg-[#DC3D3A] hover:border-2 hover:border-[#dc3d3a] hover:bg-[#f6cdcc] hover:text-[#4b4b4b] transition-all duration-300 text-white p-3 w-[90%] rounded-lg"
              type="submit"
            >
              {" "}
              Login{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Main;
