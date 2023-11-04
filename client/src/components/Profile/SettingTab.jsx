import React from "react";

const SettingTab = () => {
  return (
    <div
      className={`
      transition-all duration-500 pb-6`}
    >
      <div className="bg-white mt-5 rounded-md">
        <div className="px-4 py-5 border-b">
          <h3 className="text-xl font-bold">Password Settings</h3>
        </div>

        <div class="pt-7 px-4">
          <h4 class="text-base font-semibold mb-3">Change password</h4>
          <p class="text-[#717171]">
            You can update your password from here. If you can't remember your
            current password, just log out and click on Forgot password.
          </p>
        </div>

        {/* edit form */}
        <div className="py-6 px-5">
          <form className="flex flex-col gap-5">
            <div>
              <label htmlFor="currentPassword" className="font-bold text-sm">
                Current Password*
              </label>
              <input
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                id="currentPassword"
                type="password"
                placeholder="Enter your current password"
              />
            </div>

            <div>
              <label htmlFor="currentPassword" className="font-bold text-sm">
                New Password*
              </label>
              <input
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                id="currentPassword"
                type="password"
                placeholder="Enter your New password"
              />
            </div>

            <div>
              <label htmlFor="currentPassword" className="font-bold text-sm">
                Confirm New Password*
              </label>
              <input
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                id="currentPassword"
                type="password"
                placeholder="Enter your Confirm password"
              />
            </div>

            <div>
              <button
                type="submit"
                className="text-white bg-primary px-8 py-3 rounded-[4px] gap-[5px] font-semibold transition hover:bg-primary/70 border border-primary block w-full text-center"
              >
                <span>Update</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingTab;
