import React from "react";
import Req from "./req";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { async } from "@firebase/util";
import user from "../pages/user";

function ManageUsers() {
  const [allUsers, setUsers] = useState([]);
  const getData = async () => {
    const reqRef = collection(db, "users");
    const q = query(reqRef);
    const snap = onSnapshot(q, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return snap;
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="lg:mx-52 my-12 text-lg font-poppins ">
      <h2 className="mt-12 text-3xl font-bold text-center ">Users</h2>
      {allUsers.map((post) => (
        <Req {...post} key={post.id}>
          <div className="items-center ">
            <button className="px-4 my-4 hover:scale-105 py-2 text-white rounded-lg items-center bg-green-400">
              Reset Password
            </button>
            <br />
            <button className="px-4 py-2 hover:scale-105 text-white rounded-lg items-center bg-red-400">
              Delete Account
            </button>
          </div>
        </Req>
      ))}
    </div>
  );
}

export default ManageUsers;
