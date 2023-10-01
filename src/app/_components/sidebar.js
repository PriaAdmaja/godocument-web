"use client";

import Logout from "./logout";

const Sidebar = () => {
  const logout = () => {
    document.getElementById("logout_modal").showModal();
  };
  return (
    <aside className="w-1/5 flex flex-col bg-white rounded-md py-7 px-5 h-[500px] justify-between shadow-md">
      <div className="flex flex-col gap-3">
        <p className="text-xl hover:font-semibold cursor-pointer">Dashboard</p>
        <p className="text-xl hover:font-semibold cursor-pointer">Profile</p>
      </div>
      <Logout />
      <button type="button" className="btn btn-error mt-auto" onClick={logout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
