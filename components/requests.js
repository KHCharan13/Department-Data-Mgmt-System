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

function Requests() {
  const [allreq, setAllreq] = useState([]);
  const route = useRouter();
  const getReqs = async () => {
    const reqRef = collection(db, "requests");
    const q = query(reqRef);
    const snap = onSnapshot(q, (snapshot) => {
      setAllreq(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return snap;
  };

  useEffect(() => {
    getReqs();
  }, []);
  //reject user
  const addToDB = async (post) => {
    const requestRef = collection(db, "users");
    try {
      await addDoc(requestRef, {
        name: post.name,
        uid: post.uid,
        email: post.email,
        type: post.type,
      });
      alert("user added fully");
    } catch (error) {
      console.return;
    }
  };
  const deleteReq = async (post) => {
    const docRef = doc(db, "requests", post.id);
    await deleteDoc(docRef);
  };
  //

  // create user button
  const newUser = async (post) => {
    const password = post.uid;
    const email = post.email;
    const dispName = post.name;
    const type = post.type;
    addToDB(post);
    deleteReq(post);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser);
        updateProfile(auth.currentUser, {
          displayName: dispName,
        });
        auth.signOut();
        signInWithEmailAndPassword(
          auth,
          "baasu.kondeti@gmail.com",
          "admin@niecs"
        );
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="lg:mx-52 my-12 text-lg font-poppins ">
      <h2 className="mt-12 text-3xl font-bold text-center ">
        See all the requests below
      </h2>
      {allreq.map((post) => (
        <Req {...post} key={post.id}>
          <div className="items-center ">
            <button
              onClick={() => newUser(post)}
              className="px-4 my-4 hover:scale-105 py-2 text-white rounded-lg items-center bg-green-400"
            >
              Accept
            </button>
            <br />
            <button
              onClick={() => deleteReq(post)}
              className="px-4 py-2 hover:scale-105 text-white rounded-lg items-center bg-red-400"
            >
              Reject
            </button>
          </div>
        </Req>
      ))}
    </div>
  );
}

export default Requests;
