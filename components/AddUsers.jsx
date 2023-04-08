import React from "react";
import { useState } from "react";
import { auth, db } from "../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
function AddUsers() {
  const [name, setName] = useState("");
  const [uid, setUID] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");

  const createUser = async (e) => {
    const requestRef = collection(db, "users");
    var a = name.length * email.length * type.length * uid.length;

    if (!email.includes("nie.ac.in")) {
      a = a * 0;
      alert("Email not meeting the conditons");
    }
    if (a != 0) {
      const password = uid;
      const mail = email;
      const dispName = name;
      const stype = type;
      createUserWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser);
          updateProfile(auth.currentUser, {
            displayName: dispName,
          });
          auth.signOut();
          signInWithEmailAndPassword(
            auth,
            "baasu.kondeti@gmail.com",
            "12345678"
          );
        })
        .catch((error) => {
          alert(error);
        });
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
      alert("User has been successfully added ");
    } else {
      alert("Enter all the feilds correctly");
    }
  };
  return (
    <div className="lg:mx-52 my-12 text-lg font-poppins ">
      <h2 className="mt-12 text-3xl font-bold text-center ">Add New Users</h2>
      <div className="flex translate-x-[18vw] justify-center items-center min-w-[500px] w-[40vw]">
        <div>
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
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="Non-Teaching Staff">Non Teaching Staff</option>
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
          <label htmlFor="uid">Enter ID number provided by the College :</label>
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
            type="submit"
            onClick={() => {
              createUser();
            }}
            className="mt-6 bg-[#DC3D3A] hover:border-2 hover:border-[#dc3d3a] hover:bg-[#f6cdcc] hover:text-[#4b4b4b] transition-all duration-300 text-white p-3 w-full rounded-lg"
          >
            Add User
          </button>
        </div>
      </div>{" "}
    </div>
  );
}

export default AddUsers;
