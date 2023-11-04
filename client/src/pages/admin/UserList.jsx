import React from "react";
import { HiUsers } from "react-icons/hi";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { useGetUsersQuery } from "../../features/user/userApi";

const UserList = () => {
  const { data: users, isLoading, isError, error } = useGetUsersQuery();

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && error) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !error && users?.submitAssignments?.length === 0)
    content = <span>No Submitted Assignment Found!!</span>;

  if (!isLoading && !isError && users?.length > 0) {
    content = users?.map((user) => {
      console.log(user);
      const { firstName, lastName, profilePic } = user.profile;

      return (
        <tr key={user._id} className="border-b hover:bg-[#F1F5F9]">
          <td className="py-4 px-4 border-r">
            <img
              className="w-12 h-12 rounded-full"
              src={
                profilePic
                  ? `${process.env.REACT_APP_SERVER_URL}${profilePic}`
                  : "/img/users/img-13.jpg"
              }
              alt="user"
            />
          </td>
          <td className="py-4 px-4 border-r">{`${firstName} ${lastName}`}</td>
          <td className="py-4 px-4 border-r">{user?.email}</td>
          <td className="py-4 px-4 border-r">
            <select className="border rounded py-2 px-4 outline-none focus:ring-1">
              <option>Select Role</option>
              <option selected={user?.role === "user"} value="user">
                User
              </option>
              <option selected={user?.role === "admin"} value="admin">
                Admin
              </option>
            </select>
          </td>
          <td className="py-4 px-4 border-r">
            <div className="flex items-center gap-5">
              <Link
                to={`/profile/${user?._id}`}
                className="bg-primary text-white block py-2 px-4 rounded transition hover:bg-primary/60"
              >
                View Profile
              </Link>
              <button className="bg-red-700 text-white block py-2 px-4 rounded transition hover:bg-red-700/60">
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }
  return (
    <AdminLayout title="User List" icon={<HiUsers />}>
      <div className="py-4 px-5 rounded-md bg-white border">
        <h3 className="text-lg mb-4">User Lists ({users?.length})</h3>
        <div className="flex items-center justify-between">
          <input
            className="py-2 px-4 border w-[280px] rounded-[5px] outline-none focus:ring-1 inline-block"
            type="text"
            placeholder="Search user by user name"
          />
          {/* <Link
            class="bg-primary text-white py-[10px] px-7 inline-block uppercase text-[13px] font-semibold mt-4 transition border border-transparent hover:border-light hover:bg-white hover:text-secondary rounded-md"
            to="/admin/services/add-service"
          >
            Create New Service
          </Link> */}
        </div>
      </div>

      <div className="p-5 mt-5 bg-white border rounded-lg w-full">
        <table class="table-auto w-full border">
          <thead className="bg-[#F8FAFC] border text-left box-border">
            <tr>
              <th className="text-sm py-2 px-4 border-r">Profile</th>
              <th className="text-sm py-2 px-4 border-r">Name</th>
              <th className="text-sm py-2 px-4 border-r">Email</th>
              <th className="text-sm py-2 px-4 border-r">Role</th>
              <th className="text-sm py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UserList;
