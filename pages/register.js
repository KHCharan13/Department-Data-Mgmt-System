import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { DominoSpinner } from "react-spinners-kit";
import { db } from "../utils/firebase";
export default function register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [uid, setUID] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");

  const createRequest = async (e) => {
    const requestRef = collection(db, "requests");
    var a = name.length * email.length * type.length * uid.length;
    if (!email.includes("nie.ac.in")) {
      a = a * 0;
    }
    if (a != 0) {
      try {
        await addDoc(requestRef, {
          name: name,
          uid: uid,
          email: email,
          type: type,
        });
      } catch (error) {
        alert("not added");
      }
      alert("Request has been sent please wait for the admin to allow access");
      router.push("/");
    } else {
      alert("Enter all the feilds correctly");
    }
  };

  return (
    <div className="bg-fixed bg-no-repeat bg-cover bg-center bg-[url('../public/bg1.svg')]">
      <title>Request new user</title>
      <div className="w-full min-h-screen h-full text-center font-poppins">
        <div className="w-full min-h-screen h-full m-auto md:p-20 md:flex justify-center items-center ">
          <div className="text-left bg-white hover:scale-105 transition-all duration-500 max-w-[550px] rounded-3xl lg:w-[30vw] lg:min-h-0  shadow-2xl shadow-[#4B4B4B] h-fit p-8 mx-6 ">
            <p className="text-[#4b4b4b] text-3xl font-bold text-left my-8">
              Request a new Account
            </p>
            <p className="mt-8 text-left">
              Enter details below to request a new account
              <br />
              <br />
            </p>
            <label className="" htmlFor="acctype">
              Register as :
            </label>
            <select
              required
              className="w-full p-3 my-3 bg-[#F4F4F4] hover:scale-105 rounded-2xl transition-all duration-500"
              name="acctype"
              id="acctype"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="null"></option>
              <option value="teacher">Teaching Staff</option>
              <option value="student">Student</option>
              <option value="nonteaching">Non Teaching Staff</option>
            </select>
            <label htmlFor="Email">Enter College email :</label>
            <input
              required
              type="email"
              placeholder=" Enter College Email ID "
              id="Email"
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 my-3 bg-[#F4F4F4] rounded-2xl hover:scale-105 transition-all duration-500"
            />
            {!email.includes("nie.ac.in") && (
              <p className="text-sm text-red-400 mb-2">
                email should contain nie.ac.in
              </p>
            )}
            <label htmlFor="uid">
              Enter ID number provided by the College :
            </label>
            <input
              required
              type="text"
              onChange={(e) => setUID(e.target.value)}
              placeholder=" ID "
              id="uid"
              name="uid"
              className="w-full p-3 my-3 bg-[#F4F4F4] rounded-2xl hover:scale-105 transition-all duration-500"
            />
            <label htmlFor="name">Enter Name of the user :</label>
            <input
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder=" Name "
              id="name"
              name="name"
              className="w-full p-3 my-3 bg-[#F4F4F4] rounded-2xl hover:scale-105 transition-all duration-500"
            />
            <button
              onClick={createRequest}
              type="submit"
              className="mt-6 bg-[#DC3D3A] hover:border-2 hover:border-[#dc3d3a] hover:bg-[#f6cdcc] hover:text-[#4b4b4b] transition-all duration-300 text-white p-3 w-full rounded-lg"
            >
              Send Request
            </button>
            <br />
            <div className="text-center mt-6">
              <a
                href="/"
                className="w-full text-center text-[#dc3d3a] hover:underline hover:text-[#4b4b4b] transition-all duration-300"
              >
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
