import React from "react";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../utils/firebase";
import { useRouter } from "next/router";
function Main() {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signUp = () => {
    if (email.length && password.length) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <div className="w-full min-h-screen h-full text-center font-poppins">
      <div className="w-full min-h-screen h-full m-auto md:p-20 md:flex justify-center items-center ">
        <div className="mx-8 pt-8 text-left">
          <p className="text-4xl lg:w-[15vw] md:w-[30vw] font-bold text-[#4B4B4B]">
            Welcome to the CSE Department User Area
          </p>
          <p className="mt-[2em] lg:w-[15vw] sm:w-[30vw] mr-[10vw] text-xl text-[#4B4B4B]">
            To request a new account just click the link below
          </p>
          <p className="mt-[2em] bg-[#dc3d3a] w-[7em] p-4 font-medium text-[white] rounded-lg hover:scale-110 transition-all duration-500">
            <a href="/register">Click here</a>
          </p>
        </div>
        <div className="bg-white hover:scale-105 transition-all duration-500 max-w-[550px] rounded-3xl lg:w-[30vw] lg:min-h-0  shadow-2xl shadow-[#4B4B4B] h-fit p-8 mx-6 ">
          <p className="text-[#4b4b4b] text-3xl font-bold text-left m-8">
            Log in
          </p>
          <p className="mx-8 mt-8 text-left">
            Enter your credentials first, you will be needing to access this
            site <br />
            <br />
            Login as:
          </p>

          <input
            required
            type="Email"
            placeholder=" Email ID "
            id="Email"
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-[90%] p-3 my-3 bg-[#F4F4F4] rounded-2xl hover:scale-105 transition-all duration-500"
          />
          <input
            minLength={6}
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Password "
            id="password"
            name="password"
            className="w-[90%] p-3 my-3 bg-[#F4F4F4] rounded-2xl hover:scale-105 transition-all duration-500"
          />
          <br />
          <a
            className="text-[#DC3D3A] my-3 text-right hover:underline hover:scale-105 transition-all "
            href="/"
          >
            Forgot Password ?
          </a>
          <br />
          {email.length * password.length != 0 && (
            <button
              onClick={signUp}
              className="mt-6 bg-[#DC3D3A] hover:border-2 hover:border-[#dc3d3a] hover:bg-[#f6cdcc] hover:text-[#4b4b4b] transition-all duration-300 text-white p-3 w-[90%] rounded-lg"
            >
              {" "}
              Login{" "}
            </button>
          )}
          {email.length * password.length == 0 && (
            <button
              onClick={signUp}
              className="mt-6 bg-[#f6cdcc] transition-all duration-300 text-white p-3 w-[90%] rounded-lg"
            >
              {" "}
              Login{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
