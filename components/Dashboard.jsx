import React, { useState, useEffect, Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { storage } from "../utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { Dropdown, Collapse, Text } from "@nextui-org/react";

import { collection, query, onSnapshot, where } from "firebase/firestore";
import Req from "./req";
import Image from "next/image";
import axios from "axios";
import { Progress } from "@material-tailwind/react";
import TabStud from "./tabstud";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [fileUpload, setfileUpload] = useState(null);
  const [docList, setDocList] = useState([]);
  const [metaList, setMetaList] = useState([]);
  const [userDetails, setDetails] = useState([]);
  const [tablevis, setTableVis] = useState(false);
  const [modal, setModal] = useState(false);
  const [perc, setperc] = useState(0);
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

  useEffect(() => {
    getUsers();
  }, []);

  const uploadFile = (fileUp) => {
    if (
      fileUp.type == "image/jpeg" ||
      fileUp.type == "image/png" ||
      fileUp.type == "application/pdf"
    ) {
      if (fileUp.size <= 2097152) {
        let data = new FormData();
        data.append("file", fileUp);
        const bar = document.getElementById("Progressbar");
        const options = {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;

            const percentage = Math.floor((loaded * 100) / total);
            bar.setAttribute("value", percentage);
            bar.previousElementSibling.textContent = `${percentage}%`;

            if (percentage === 100) {
              bar.previousElementSibling.textContent = "Upload Complete";
            }
          },
        };
        axios.post("https://httpbin.org/post", data, options).then((res) => {});
      } else {
        document.getElementById("file").value = "";
        alert(
          "File size is greater than 2 MB please upload a compressed version"
        );
      }
    } else {
      document.getElementById("file").value = "";
      alert("please upload only JPG,JPEG or PDF");
    }
  };

  const addnew = () => {
    a = userDetails;
    if (fileUpload == null) return;
    const fileRef = ref(storage, `${a[0].type}/${a[0].uid}/${filename}`);
    uploadBytes(fileRef, fileUpload, metadata)
      .then(() => {
        alert("File uploaded");
      })
      .catch((error) => {
        alert("file aldready exists/ File not uploaded", error);
      });
    viewItems();
    setModal(false);
  };

  return (
    <Fragment>
      <div>
        <div className="mx-[10%] mt-10 font-poppins bg-[#F4F4F4] rounded-3xl min-h-screen p-14">
          <h1 className="flex justify-center py-10 font-bold text-5xl">
            Welcome!
          </h1>
          <div className="flex justify-center items-center mix-blend-multiply">
            <Image
              src="/avatar-scaled.jpeg"
              width={300}
              height={300}
              alt="Profile Avatar"
            />
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
                onClick={() => alert("Update Profile")}
              >
                Edit Profile
              </button>
              <button
                className="mt-10 bg-amber-300 w-fit px-5 py-3 rounded-lg hover:bg-amber-500 hover:text-white "
                onClick={() => setModal(true)}
              >
                Add new Documents
              </button>
            </div>
          </div>

          {user.email.includes("4ni") && (
            <div>
              {userDetails.map((items) => (
                <TabStud {...items} key={items.id}></TabStud>
              ))}{" "}
            </div>
          )}
          {userDetails.type}
          <div className="flex justify-center items-center">
            {Boolean(Boolean(docList.length) ^ tablevis.valueOf()) == true && (
              <div>No Files Uploaded</div>
            )}
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
            <br />
          </div>
        </div>
      </div>
      {modal.valueOf() == false && <div></div>}
      {modal.valueOf() == true && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center font-poppins">
            <div className="flex flex-col">
              <div className=" bg-white rounded-3xl px-14 py-12">
                <div className="flex justify-between">
                  <div></div>
                  <div>
                    <button
                      className="text-2xl"
                      onClick={() => setModal(false)}
                    >
                      x
                    </button>
                  </div>
                </div>

                <div className="">
                  <h1 className="text-3xl font-bold flex justify-center mb-10">
                    Add New Documents
                  </h1>
                  <h1 className="text-[#4b4b4b]">
                    Fill the details before uploading the file
                  </h1>
                  <br />
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
                  <div class="flex items-center justify-evenly">
                    <h1>Type of File</h1>
                    <Dropdown>
                      <Dropdown.Button id="asd" flat>
                        Type of File
                      </Dropdown.Button>
                      <Dropdown.Menu
                        onAction={(key) => {
                          console.log(key);
                          document.getElementById("asd").textContent = key;
                          setFileType(key);
                        }}
                        aria-label="Static Actions"
                      >
                        <Dropdown.Item key="activitypoints">
                          Activity Points
                        </Dropdown.Item>
                        <Dropdown.Item key="projects">
                          Project Documents
                        </Dropdown.Item>
                        <Dropdown.Item key="seminar">Seminars</Dropdown.Item>
                        <Dropdown.Item key="resume">Resume</Dropdown.Item>
                        <Dropdown.Item key="others" color="error">
                          Other
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  {/* <label className="mt-3" htmlFor="Type">
                    Document Type
                  </label>
                  <br />
                  <input
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full mb-5 placeholder:text-sm focus:bg-white focus:border-2 border-amber-400 bg-amber-100 px-4 py-2 rounded-xl"
                    type="text"
                    id="Type"
                    placeholder="type"
                  /> */}
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
                    onChange={(e) => (
                      setfileUpload(e.target.files[0]),
                      uploadFile(e.target.files[0])
                    )}
                    type="file"
                    accept="image/*,.pdf"
                    id="file"
                  />
                  <br />
                  <div>
                    <label className="text-center" htmlFor="Progressbar">
                      0%
                    </label>
                    <progress
                      className=" w-full rounded-full bg-blue-gray-100 "
                      id="Progressbar"
                      value="0"
                      max="100"
                    ></progress>
                  </div>
                  <div>
                    {filename.length *
                      filetype.length *
                      filedescription.length ==
                      0 && (
                      <div className=" flex text-rose-500 justify-center">
                        All the feilds are not filled
                      </div>
                    )}

                    {filename.length *
                      filetype.length *
                      filedescription.length !=
                      0 && (
                      <div>
                        <button
                          onClick={() => addnew()}
                          className="bg-amber-300 w-full rounded-lg  hover:bg-amber-500 hover:text-white   px-3 py-2"
                        >
                          UPLOAD
                        </button>
                      </div>
                    )}
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
