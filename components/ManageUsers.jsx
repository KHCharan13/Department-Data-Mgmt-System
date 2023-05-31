import React from "react";
import Req from "./req";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { GrPowerReset } from "react-icons/gr";
import { RiAccountBoxFill } from "react-icons/ri";
import { TiUserDelete } from "react-icons/ti";
import { BiReset } from "react-icons/bi";
import {
  addDoc,
  doc,
  deleteDoc,
  collection,
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
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, Text, Button } from "@nextui-org/react";

function ManageUsers() {
  const [allUsers, setUsers] = useState([]);
  const [allStud, setStud] = useState([]);
  const [allTeach, setTeach] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const handler = (post) => {
    setVisible(true);
    setSelected(post);
  };

  const handler1 = (post) => {
    setVisible1(true);
    setSelected(post);
  };

  const [selected, setSelected] = useState([]);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const closeHandler1 = () => {
    setVisible1(false);
    console.log("closed");
  };

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

  const sendreset = () => {
    sendPasswordResetEmail(auth, selected.email)
      .then(() => {
        alert("Sent successfully to");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };
  const deleteReq = async () => {
    setVisible1(false);
    const docRef = doc(db, "users", selected.id);
    await deleteDoc(docRef);
  };
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
              <div className="flex justify-between mx-20 my-10 ">
                <button
                  onClick={(e) => {
                    handler(post);
                  }}
                  className="flex items-center gap-4 bg-purple-200 rounded-3xl px-4 py-2 hover:bg-purple-300 hover:text-white"
                >
                  Reset Password <BiReset />{" "}
                </button>

                <button
                  onClick={(e) =>
                    viewProf(post.name, post.uid, post.email, post.type)
                  }
                  className="flex items-center gap-4 bg-purple-200 rounded-3xl px-4 py-2 hover:bg-purple-300 hover:text-white"
                >
                  View Account
                  <RiAccountBoxFill scale={115} />
                </button>

                <button
                  onClick={() => {
                    handler1(post);
                  }}
                  className="flex items-center gap-4 bg-purple-200 rounded-3xl px-4 py-2 hover:bg-purple-300 hover:text-white"
                >
                  Delete Account <TiUserDelete />{" "}
                </button>
              </div>
            </Req>
          ))}
        </TabPanel>
        <TabPanel>
          {allTeach.map((post) => (
            <Req {...post} key={post.id}>
              <div className="flex justify-between mx-20 my-10 ">
                <button
                  onClick={(e) => {
                    handler(post);
                  }}
                  className="flex items-center gap-4 bg-purple-200 rounded-3xl px-4 py-2 hover:bg-purple-300 hover:text-white"
                >
                  Reset Password <BiReset />{" "}
                </button>

                <button
                  onClick={(e) =>
                    viewProf(post.name, post.uid, post.email, post.type)
                  }
                  className="flex items-center gap-4 bg-purple-200 rounded-3xl px-4 py-2 hover:bg-purple-300 hover:text-white"
                >
                  View Account
                  <RiAccountBoxFill scale={115} />
                </button>

                <button
                  onClick={() => {
                    handler1(post);
                  }}
                  className="flex items-center gap-4 bg-purple-200 rounded-3xl px-4 py-2 hover:bg-purple-300 hover:text-white"
                >
                  Delete Account <TiUserDelete />{" "}
                </button>
              </div>
            </Req>
          ))}
        </TabPanel>
      </Tabs>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Reset Password
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text className="font-poppins" id="modal-title" size={18}>
            Are you sure want to reset password of <br />
            <br />
            Name : {selected.name} <br />
            Email : {selected.email} <br />
            ID : {selected.uid} <br />
            Type : {selected.type}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onClick={(e) => {
              sendreset();
            }}
          >
            Reset
          </Button>
        </Modal.Footer>
      </Modal>

      {/* this is for the delete user */}

      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible1}
        onClose={closeHandler1}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Delete User
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text className="font-poppins" id="modal-title" size={18}>
            Are you sure want to delete the user <br />
            <br />
            Name : {selected.name} <br />
            Email : {selected.email} <br />
            ID : {selected.uid} <br />
            Type : {selected.type}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler1}>
            Close
          </Button>
          <Button auto onClick={() => deleteReq()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManageUsers;
