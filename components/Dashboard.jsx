import React, { useState, useEffect, Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { storage } from "../utils/firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import {
  collection,
  query,
  onSnapshot,
  where,
  setDoc,
} from "firebase/firestore";
import Req from "./req";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [fileUpload, setfileUpload] = useState(null);
  const [docList, setDocList] = useState([]);
  const [metaList, setMetaList] = useState([]);
  const [userDetails, setDetails] = useState([]);
  const [tablevis, setTableVis] = useState(false);
  const [modal, setModal] = useState(false);
  if (user == null) {
    return;
  }
  const [filename, setFileName] = useState("");
  const [filetype, setFileType] = useState("");
  const [filedescription, setFileDescription] = useState("");
  const metadata = {
    customMetadata: {
      filename: filename,
      filetype: filetype,
      filedescription: filedescription,
    },
  };
  var a = null;
  const getUsers = async () => {
    const reqRef = collection(db, "users");
    const q = query(reqRef, where("email", "==", user.email));
    await onSnapshot(q, (snapshot) => {
      setDetails(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  };

  const viewItems = () => {
    setTableVis(true);
    a = userDetails;
    setDocList([]);
    setMetaList([]);
    const fileListRef = ref(storage, `${a[0].type}/${a[0].uid}/`);
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setDocList((prev) => [...prev, url]);
        });
        getMetadata(item).then((data) => {
          setMetaList((prev) => [...prev, data]);
        });
      });
    });
  };

  useEffect(() => {
    getUsers();
    console.log(user);
  }, []);

  const addnew = () => {
    a = userDetails;
    if (fileUpload == null) return;
    const fileRef = ref(storage, `${a[0].type}/${a[0].uid}/${filename}`);
    uploadBytes(fileRef, fileUpload, metadata).then(() => {
      alert("File uploaded");
    });
  };

  return (
    <Fragment>
      <div>
        <div className="mx-[10%] mt-10 font-poppins bg-[#F4F4F4] rounded-3xl min-h-screen p-14">
          <h1 className="flex justify-center py-10 font-bold text-5xl">
            Welcome!
          </h1>
          <div className="flex justify-center items ">
            <h1 className="h-40 w-40 bg-white rounded-full"></h1>
          </div>
          <div className="flex justify-center">
            {userDetails.map((items) => (
              <Req {...items} key={items.id}></Req>
            ))}
          </div>
          <div className="justify-center">
            <h1 className="text-4xl flex justify-center">Your Documents</h1>
            <div className="flex gap-8 justify-center ">
              <button
                className="mt-10 bg-amber-300 w-fit px-5 py-3 rounded-lg hover:bg-amber-500 hover:text-white "
                onClick={() => viewItems()}
              >
                Click here to view
              </button>
              <button
                className="mt-10 bg-amber-300 w-fit px-5 py-3 rounded-lg hover:bg-amber-500 hover:text-white "
                onClick={() => setModal(true)}
              >
                Add new Documents
              </button>
            </div>
          </div>
          <div className="p-10 flex justify-center items-center">
            {tablevis.valueOf() == false && <div></div>}
            {tablevis.valueOf() == true && (
              <table className="w-full rounded-3xl bg-white ">
                <tr className="border-b-4">
                  <th
                    scope="col"
                    className="font-bold text-gray-900 px-6 py-4 text-left"
                  >
                    File Name
                  </th>
                  <th
                    scope="col"
                    className=" font-bold text-gray-900 px-6 py-4 text-left"
                  >
                    File Type
                  </th>
                  <th
                    scope="col"
                    className=" font-bold text-gray-900 px-6 py-4 text-left"
                  >
                    File Description
                  </th>
                  <th
                    scope="col"
                    className="font-bold text-gray-900 px-6 py-4 text-left"
                  >
                    Links
                  </th>
                </tr>

                {metaList.map((items) => {
                  return (
                    <tr>
                      <td className="  px-6 py-4 text-left">
                        {items.customMetadata.filename}
                      </td>

                      <td className="   px-6 py-4 text-left">
                        {items.customMetadata.filetype}
                      </td>
                      <td className=" px-6 py-4 text-left">
                        {items.customMetadata.filedescription}
                      </td>
                      <td className=" font-bold px-6 py-4 text-left">
                        <a
                          className="hover:underline text-blue-400 "
                          href={docList[metaList.indexOf(items)]}
                        >
                          Click here to view
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </table>
            )}
          </div>
        </div>
      </div>
      {modal.valueOf() == false && <div></div>}
      {modal.valueOf() == true && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center font-poppins">
            <div className="flex flex-col">
              <button
                className=" text-white text-2xl place-self-end"
                onClick={() => setModal(false)}
              >
                x
              </button>
              <div className=" bg-white rounded-3xl px-14 py-12 flex justify-center">
                <div className="">
                  <h1 className="text-3xl font-bold flex justify-center mb-10">
                    Add New Documents
                  </h1>
                  {/* 0 is the index of the image used ref video link https://www.youtube.com/watch?v=YOAeBSCkArA */}
                  <label className="mt-3" htmlFor="Name">
                    Document Name
                  </label>
                  <br />
                  <input
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full mb-5 placeholder:text-sm focus:bg-white focus:border-2 border-amber-400 bg-amber-100 px-4 py-2 rounded-xl"
                    type="text"
                    id="Name"
                    placeholder="Name of Document"
                  />{" "}
                  <br />
                  <label className="mt-3" htmlFor="Type">
                    Document Type
                  </label>
                  <br />
                  <input
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full mb-5 placeholder:text-sm focus:bg-white focus:border-2 border-amber-400 bg-amber-100 px-4 py-2 rounded-xl"
                    type="text"
                    id="Type"
                    placeholder="type"
                  />
                  <br />
                  <label className="" htmlFor="Name">
                    Document Description
                  </label>
                  <br />
                  <textarea
                    onChange={(e) => setFileDescription(e.target.value)}
                    className="w-full mb-5 placeholder:text-sm focus:bg-white focus:border-2 border-amber-400 bg-amber-100 px-4 py-2 rounded-xl"
                    type="textarea"
                    placeholder="description"
                  />
                  <br />
                  <label htmlFor="file">Select the file</label>
                  <br />
                  <input
                    className="p-3"
                    onChange={(e) => setfileUpload(e.target.files[0])}
                    type="file"
                    id="file"
                  />
                  <br />
                  <div>
                    <button
                      onClick={() => addnew()}
                      className="bg-amber-300 w-full rounded-lg  hover:bg-amber-500 hover:text-white   px-3 py-2"
                    >
                      UPLOAD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Dashboard;
