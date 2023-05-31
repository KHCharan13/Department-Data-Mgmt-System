import React, { useState, useEffect, Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { updateProfile, updatePassword } from "firebase/auth";

import { storage } from "../utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { Dropdown, Collapse, Spacer } from "@nextui-org/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import Req1 from "./req1";
import axios from "axios";
import { Progress } from "@material-tailwind/react";
import TabStud from "./tabstud";
import { Modal, Text, Input, Button, Image } from "@nextui-org/react";
function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [fileUpload, setfileUpload] = useState(null);
  const [docList, setDocList] = useState([]);
  const [metaList, setMetaList] = useState([]);
  const [userDetails, setDetails] = useState([]);
  const [tablevis, setTableVis] = useState(false);
  const [modal, setModal] = useState(false);
  const [perc, setperc] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  if (user == null) {
    return;
  }
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
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
  const handler = () => {
    setVisible(true);
  };
  const closeHandler = () => {
    setVisible(false);
    setPhoto(null);
  };

  const handler1 = () => {
    setVisible1(true);
  };
  const closeHandler1 = () => {
    setVisible1(false);
  };
  const updatePass = () => {
    updatePassword(user, password)
      .then(() => {
        closeHandler1();
        alert("password updated successfully");
      })
      .catch((error) => {
        alert(
          "You were online for a quite some time please log out and log in again to update password"
        );
      });
  };
  const updatePhoto = () => {
    const dname = user.displayName;
    updateProfile(auth.currentUser, {
      photoURL: photo,
    })
      .then(() => {
        closeHandler();
      })
      .catch((error) => {
        alert("error occured");
      });
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
      <div className="">
        <div className="mt-10 md:mx-[10vw] font-poppins bg-[#F4F4F4] w-fit rounded-3xl min-h-screen p-14">
          <h1 className="flex justify-center py-10 font-bold text-5xl">
            Welcome! {user.displayName}
          </h1>
          <div className="flex justify-center">
            <div className="shadow-2xl rounded-full shadow-black">
              {user.photoURL == null && (
                <Image
                  className="rounded-full mix-blend-multiply"
                  showSkeleton
                  src="/avatar-scaled.jpeg"
                  objectFit="fill"
                  width={300}
                  height={300}
                  alt="file not loaded"
                />
              )}
              {user.photoURL != null && (
                <Image
                  className="rounded-full mix-blend-multiply"
                  showSkeleton
                  src={user.photoURL}
                  objectFit="fill"
                  width={300}
                  height={300}
                  alt="nothing"
                />
              )}
            </div>
          </div>
          <div className="flex justify-center">
            {userDetails.map((items) => (
              <Req1 {...items} key={items.id}></Req1>
            ))}
          </div>
          <div className="justify-center">
            <h1 className="text-4xl flex justify-center">Your Documents</h1>
            <div className="flex gap-8 justify-center ">
              <button
                className="mt-10 bg-amber-300 w-fit px-5 py-3 rounded-lg hover:bg-amber-500 hover:text-white "
                onClick={() => handler1()}
              >
                Update password
              </button>
              <button
                className="mt-10 bg-amber-300 w-fit px-5 py-3 rounded-lg hover:bg-amber-500 hover:text-white "
                onClick={() => handler()}
              >
                Update Photo
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
            <div className=" w-fit ">
              {userDetails.map((items) => (
                <TabStud {...items} key={items.id}></TabStud>
              ))}{" "}
            </div>
          )}

          {!user.email.includes("4ni") && (
            <div>
              {userDetails.map((items) => (
                <TabLec {...items} key={items.id}></TabLec>
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
              Upload photo URL
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-title" size={18}>
            <div className="font-poppins flex-col justify-center mt-7">
              <Input
                clearable
                fullWidth="true"
                bordered
                onChange={(e) => setPhoto(e.target.value)}
                color="default"
                labelPlaceholder="Photo URL"
              />
              Preview Image :
              {photo != null && photo != "" && (
                <Image src={photo} alt="invalid url" />
              )}
            </div>
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="default" onPress={() => updatePhoto()}>
            Update Photo
          </Button>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
              Update password
            </Text>
            <input type="text"></input>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="font-poppins flex-col justify-center mt-3">
              <Input.Password
                fullWidth="true"
                bordered
                onChange={(e) => setPassword(e.target.value)}
                color="default"
                labelPlaceholder="Enter New Password"
              />
              <Spacer y={1.6} />
              <Input.Password
                fullWidth="true"
                bordered
                onChange={(e) => setPassword1(e.target.value)}
                color="default"
                labelPlaceholder="Re-Enter New Password"
              />
              <Spacer y={1} />
              {password.length < 8 && (
                <h1 className="text-sm text-red-300">
                  Password should be 8 characters long
                </h1>
              )}
              {password != null &&
                password1 != null &&
                password.length > 8 &&
                password != password1 && (
                  <h1 className="text-sm text-red-300">
                    Passwords do not match
                  </h1>
                )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {password != null &&
            password1 != null &&
            password.length > 8 &&
            password === password1 && (
              <Button
                auto
                flat
                color="default"
                onPress={() => {
                  updatePass();
                }}
              >
                Update Password
              </Button>
            )}
          <Button auto flat color="error" onPress={closeHandler1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {modal.valueOf() == false && <div></div>}
      {modal.valueOf() == true && (
        <div>
          <div className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center font-poppins">
            <div className="flex flex-col">
              <div className=" bg-white rounded-3xl px-14 py-12">
                <div className="flex justify-between">
                  <div></div>
                  <div>
                    <button
                      className="text-2xl"
                      onClick={() => setModal(false)}
                    >
                      <AiFillCloseCircle />
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
                    {user.email.includes("4ni") && (
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
                    )}
                    {!user.email.includes("4ni") && (
                      <Dropdown>
                        <Dropdown.Button id="asd" flat>
                          Type of File
                        </Dropdown.Button>
                        <Dropdown.Menu
                          onAction={(key) => {
                            document.getElementById("asd").textContent = key;
                            setFileType(key);
                          }}
                          aria-label="Static Actions"
                        >
                          <Dropdown.Item key="journal">Journal</Dropdown.Item>
                          <Dropdown.Item key="research">
                            Research Papers
                          </Dropdown.Item>
                          <Dropdown.Item key="seminar">Seminars</Dropdown.Item>
                          <Dropdown.Item key="resume">Resume</Dropdown.Item>
                          <Dropdown.Item key="others" color="error">
                            Other
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
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
