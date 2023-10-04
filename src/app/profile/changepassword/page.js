"use client";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import authCheck from "@/utils/private-route/authCheck";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../../_components/header";
import Sidebar from "@/app/_components/sidebar";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [reNewPassword, setReNewPassword] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const { token } = useSelector((state) => state.user);

  const router = useRouter();

  const savePassword = async (e) => {
    try {
      e.preventDefault();
      setSaveLoading(true);
      if (newPassword !== reNewPassword) {
        setIsPasswordMatch(false);
        toast.error("Check your password ");
        return;
      }
      setIsPasswordMatch(true);
      const body = {
        oldPassword,
        newPassword,
      };
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/users/editpassword`;
      const result = await axios.patch(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(result.data.msg);
      e.target.reset();
    } catch (error) {
      toast.error(error.response.data.msg || "Error");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex px-16 py-5">
        <Sidebar />
        <section className="w-4/5 p-10 flex flex-col items-center bg-white ml-3 rounded-lg ">
          <p className="text-2xl text-center pb-5">Change Password</p>
          <form onSubmit={savePassword}>
            <div className="form-control w-full max-w-sm">
              <label className="label">
                <span>Old Password : </span>
              </label>
              <input
                type="text"
                placeholder="Input your old password"
                className="input input-bordered w-full "
                onChange={(e) => setOldPassword(e.target.value)}
                disabled={saveLoading}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span>New Password : </span>
              </label>
              <input
                type="text"
                placeholder="Input your new password"
                className={`input input-bordered ${
                  isPasswordMatch ? "" : "input-error"
                } w-full max-w-xs`}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={saveLoading}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span>Re-enter New Password : </span>
              </label>
              <input
                type="text"
                placeholder="Re-input your new password"
                className={`input input-bordered ${
                  isPasswordMatch ? "" : "input-error"
                } w-full max-w-xs`}
                onChange={(e) => setReNewPassword(e.target.value)}
                disabled={saveLoading}
              />
            </div>
            <div className="mt-5">
              <button
                className={`${
                  saveLoading ? "hidden" : "block"
                } btn btn-neutral w-full`}
                type="submit"
                disabled={
                  !oldPassword && !newPassword && !reNewPassword ? true : false
                }
              >
                Save
              </button>
              <button
                className={`${
                  saveLoading ? "block" : "hidden"
                } btn btn-neutral w-full`}
              >
                <span className="loading loading-dots loading-md"></span>
              </button>
              <button type="button" className="btn w-full mt-4 btn-outline" onClick={() => router.push("/profile")} disabled={saveLoading}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>
      <ToastContainer />
    </>
  );
};

export default authCheck(ChangePassword);
