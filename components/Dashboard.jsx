import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { storage } from "../utils/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import Req from "./req";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [fileUpload, setfileUpload] = useState(null);
  const [docList, setDocList] = useState([]);
  const [userDetails, setDetails] = useState([]);
  if (user == null) {
    return;
  }
  const getUsers = async () => {
    const reqRef = collection(db, "users");
    const q = query(reqRef, where("email", "==", user.email));
    const snap = onSnapshot(q, (snapshot) => {
      setDetails(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return snap;
  };

  const viewItems = (items) => {
    console.log(items);
    const fileListRef = ref(storage, `${items.type}/${items.uid}/`);
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setDocList((prev) => [...prev, url]);
        });
      });
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const uploadFile = () => {};
  const addnew = (items) => {
    console.log(items);
    const a = items.type;
    if (fileUpload == null) return;
    const fileRef = ref(
      storage,
      `${items.type}/${items.uid}/${fileUpload.name}`
    );
    uploadBytes(fileRef, fileUpload).then(() => {
      alert("immage uploaded");
    });
  };
  return (
    <div className="mx-14 mt-10 font-poppins">
      <h1 className="flex justify-center font-bold text-5xl">Welcome!</h1>
      <div className="flex justify-center">photo</div>
      <div className="">
        {userDetails.map((items) => (
          <Req {...items} key={items.id}>
            <div className="items-center ">
              <button onClick={() => addnew(items)}>Add New</button>
              <br />
              <button onClick={() => viewItems(items)}>View</button>
            </div>
          </Req>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="">
          <div className="">Your Documents</div>
          <div className="p-2">
            <div className="">
              <div>
                {/* 0 is the index of the image used ref video link https://www.youtube.com/watch?v=YOAeBSCkArA */}
                <input
                  onChange={(e) => setfileUpload(e.target.files[0])}
                  type="file"
                />
              </div>
              <div>
                <button
                  onClick={uploadFile()}
                  className="bg-black text-white mx-10"
                >
                  upload
                </button>
              </div>
              {docList.map((url) => {
                return <img src={url} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
