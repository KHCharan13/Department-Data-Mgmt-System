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
  where,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Router, useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { async } from "@firebase/util";
import user from "../pages/user";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
function ManageUsers() {
  const [allUsers, setUsers] = useState([]);
  const [allStud, setStud] = useState([]);
  const [allTeach, setTeach] = useState([]);

  const getData = async () => {
    const reqRef = collection(db, "users");
    const q = query(reqRef, where("type", "==", "student"));
    const snap = onSnapshot(q, (snapshot) => {
      console.log("inside snap");
      setStud(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return snap;
  };
  const getData1 = async () => {
    const reqRef = collection(db, "users");
    const q = query(reqRef, where("type", "==", "teacher"));
    const snap1 = onSnapshot(q, (snapshot) => {
      console.log("inside snap1");
      setTeach(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return snap1;
  };
  const a = useRouter();
  function viewProf(name, uid, email, type) {
    a.push({
      pathname: "/profile",
      query: {
        name,
        uid,
        email,
        type,
      },
    });
  }
  var num = 0;
  useEffect(() => {
    if (num === 0) {
      getData();
      getData1();
      num = num + 1;
    }
  }, []);
  return (
    <div className="lg:mx-52 my-12 text-lg font-poppins ">
      <h2 className="mt-12 text-3xl font-bold text-center ">Users</h2>

      <Tabs>
        <TabList className="font-poppins flex justify-center text-xl mt-6 hover:cursor-pointer">
          <Tab className="mx-8 hover:bg-amber-300 px-4 py-2 rounded-t-xl focus:bg-amber-400">
            Student
          </Tab>
          <Tab className="mx-8 hover:bg-amber-300 px-4 py-2 rounded-t-xl focus:bg-amber-400">
            Teachers
          </Tab>
        </TabList>
        <TabPanel>
          {allStud.map((post) => (
            <Req {...post} key={post.id}>
              <div className="items-center ">
                <button className="px-4 my-4 hover:scale-105 py-2 text-white rounded-lg items-center bg-green-400">
                  Reset Password
                </button>
                <br />
                <button
                  onClick={(e) =>
                    viewProf(post.name, post.uid, post.email, post.type)
                  }
                  className="px-4 py-2 hover:scale-105  text-white rounded-lg items-center bg-amber-400"
                >
                  View Account
                </button>
                <br />
                <button className="px-4 py-2 hover:scale-105 my-4 text-white rounded-lg items-center bg-red-400">
                  Delete Account
                </button>
              </div>
            </Req>
          ))}
        </TabPanel>
        <TabPanel>
          {allTeach.map((post) => (
            <Req {...post} key={post.id}>
              <div className="items-center ">
                <button className="px-4 my-4 hover:scale-105 py-2 text-white rounded-lg items-center bg-green-400">
                  Reset Password
                </button>
                <br />
                <button
                  onClick={(e) =>
                    viewProf(post.name, post.uid, post.email, post.type)
                  }
                  className="px-4 py-2 hover:scale-105  text-white rounded-lg items-center bg-amber-400"
                >
                  View Account
                </button>
                <br />
                <button className="px-4 py-2 hover:scale-105 my-4 text-white rounded-lg items-center bg-red-400">
                  Delete Account
                </button>
              </div>
            </Req>
          ))}
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default ManageUsers;
