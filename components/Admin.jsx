import React from "react";
import Requests from "./requests";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ManageUsers from "./ManageUsers";
import AddUsers from "./AddUsers";
export default function () {
  return (
    <div>
      <Tabs>
        <TabList className="font-poppins flex justify-center text-xl mt-6 hover:cursor-pointer">
          <Tab className="mx-8 hover:bg-amber-300 px-4 py-2 rounded-t-xl focus:bg-amber-400">
            Requests
          </Tab>
          <Tab className="mx-8 hover:bg-amber-300 px-4 py-2 rounded-t-xl focus:bg-amber-400">
            Manage Users
          </Tab>
          <Tab className="mx-8 hover:bg-amber-300 px-4 py-2 rounded-t-xl focus:bg-amber-400">
            Add Users
          </Tab>
        </TabList>
        <TabPanel>
          <Requests />
        </TabPanel>
        <TabPanel>
          <ManageUsers />
        </TabPanel>
        <TabPanel>
          <AddUsers />
        </TabPanel>
      </Tabs>
    </div>
  );
}
