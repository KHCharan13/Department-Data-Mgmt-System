import React, { useState } from "react";
import user from "../pages/user";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { storage } from "../utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [fileUpload, setfileUpload] = useState(null);
  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `teachers/${user.email}/${fileUpload.name}`);
    uploadBytes(fileRef, fileUpload).then(() => {
      alert("immage uploaded");
    });
  };
  return (
    <div className="mx-14 mt-10 font-poppins">
      <h1 className="flex justify-center font-bold text-5xl">Welcome!</h1>
      <div className="flex justify-center">photo</div>
      <div className="flex justify-center">{user.email}</div>
      <div className="flex justify-center">
        <div className="mt-8 justify-between flex items-center rounded-t-full px-8 bg-red-900 lg:w-[70%] w-[90%]">
          <div className="text-white">Your Documents</div>
          <div className="p-2">
            <h1 className="hover:cursor-pointer hover:bg-amber-600 text-white bg-amber-500 px-4 py-2 rounded-3xl text-center">
              Add new
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          {/* 0 is the index of the image used ref video link https://www.youtube.com/watch?v=YOAeBSCkArA */}
          <input
            onChange={(e) => setfileUpload(e.target.files[0])}
            type="file"
          />
        </div>
        <div>
          <button onClick={uploadFile()} className="bg-black text-white mx-10">
            upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
