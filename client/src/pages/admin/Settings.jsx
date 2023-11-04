import React from "react";
import { IoMdSettings } from "react-icons/io";
import AdminLayout from "../../components/admin/AdminLayout";

const Settings = () => {
  return (
    <AdminLayout title="Settings" icon={<IoMdSettings />}>
      <div className=" bg-white mt-5 rounded-md mb-10">
        {/* edit form */}
        <div className="py-6 px-5">
          <div className="w-full flex gap-10 justify-center">
            <div>
              <h3 className="font-bold text-lg">Header Logo</h3>
              <input
                id="headerLogo"
                type="file"
                className="hidden"
                // value={title}
                // onChange={(e) => setTitle(e.target.value)}
              />

              <div className="p-4 rounded-md border inline-block my-5 w-40 text-center">
                <img className="w-full" src="/img/logo.png" alt="logo" />
                <div className="text-center">
                  {/* <img
                  className="mx-auto w-16"
                  src="/img/loading.gif"
                  alt="loading"
                /> */}
                </div>
              </div>

              <div>
                <label
                  htmlFor="headerLogo"
                  className="inline-block bg-primary py-2 px-6 rounded text-white font-semibold cursor-pointer hover:bg-primary/80 transition-all"
                >
                  Change Logo
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg">Footer Logo</h3>
              <input
                id="footerLogo"
                type="file"
                className="hidden"
                // value={title}
                // onChange={(e) => setTitle(e.target.value)}
              />

              <div className="p-4 rounded-md border inline-block my-5 w-40 text-center">
                <img className="w-full" src="/img/logo.png" alt="logo" />
                <div className="text-center">
                  {/* <img
                  className="mx-auto w-16"
                  src="/img/loading.gif"
                  alt="loading"
                /> */}
                </div>
              </div>

              <div>
                <label
                  htmlFor="footerLogo"
                  className="inline-block bg-primary py-2 px-6 rounded text-white font-semibold cursor-pointer hover:bg-primary/80 transition-all"
                >
                  Change Logo
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
