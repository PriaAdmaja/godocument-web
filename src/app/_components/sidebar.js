"use client";
import { useRouter, usePathname } from "next/navigation";

import Logout from "./logout";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const mainPathname = pathname.split("/")[1];
  const logout = () => {
    document.getElementById("logout_modal").showModal();
  };

  return (
    <aside className="w-1/5 flex flex-col bg-white rounded-md py-7 px-5 h-[500px] justify-between shadow-md">
      <div className="flex flex-col gap-3">
        <p
          className={`${mainPathname === 'dashboard' ? 'font-semibold' : ''} text-xl hover:font-semibold cursor-pointer`}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </p>
        <p
          className={`${mainPathname === 'document' ? 'font-semibold' : ''} text-xl hover:font-semibold cursor-pointer`}
          onClick={() => router.push("/document")}
        >
          Document
        </p>
        <p
          className={`${mainPathname === 'profile' ? 'font-semibold' : ''} text-xl hover:font-semibold cursor-pointer`}
          onClick={() => router.push("/profile")}
        >
          Profile
        </p>
      </div>
      <Logout />
      <button type="button" className="btn btn-error mt-auto" onClick={logout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
