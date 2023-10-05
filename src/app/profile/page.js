"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import Header from "../_components/header";
import Sidebar from "../_components/sidebar";

import defaultAvatar from "../../assets/default-avatar.jpg";
import Loader from "../_components/loader";
import { userAction } from "@/redux/slices/user";
import jwtExpired from "@/utils/private-route/jwtExpired";
import authCheck from "@/utils/private-route/authCheck";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const router = useRouter();
  const { id, token, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let getData = true;
    if (getData) {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/users/${id}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setProfile(res.data.data))
        .catch((err) => {
          jwtExpired(err.response.data.msg);
          toast.error(err.response.data.msg || "Error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const changeProfile = async (e) => {
    try {
      setSaveLoading(true)
      e.preventDefault();
      const body = {
        name: profile.name,
        biodata: profile.biodata,
      };
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/users`;
      const result = await axios.patch(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(userAction.submitName(result.data.data[0].name));
      toast.success("Edit profile is success!");
      setIsEdit(false);
    } catch (error) {
      toast(error.esponse.data.msg || "Error");
    } finally {
      setSaveLoading(false)
    }
  };
  console.log(profile);

  const newProfile = (key, value) => {
    const prefData = { ...profile };
    prefData[key] = value;
    setProfile(prefData);
  };

  if (isLoading) return <Loader isShow={isLoading} />;

  return (
    <>
      <Header />
      <main className="flex px-16 py-5">
        <Sidebar />
        <section className="w-4/5 p-10 flex flex-col items-center bg-white ml-3 rounded-lg ">
          <section
            className={`${
              isEdit === true ? "hidden" : "flex"
            } flex-col items-center gap-5`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="avatar">
                <div className="w-40 rounded-full ring ring-gray-400">
                  <Image
                    src={
                      profile.avatar_url ? profile.avatar_url : defaultAvatar
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs py-2">{profile.email}</p>
                <p className="text-xs py-2">{profile.role}</p>
                <p className="font-bold text-2xl">{profile.name}</p>
                <p>{profile.biodata ? profile.biodata : ""}</p>
              </div>
            </div>
            <div></div>
            <div className="flex flex-col gap-4 w-60">
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => setIsEdit(true)}
              >
                Edit Profile
              </button>
              <button
                className="btn btn-outline"
                onClick={() => router.push("/profile/changepassword")}
              >
                Change Password
              </button>
            </div>
          </section>
          <section
            className={`${
              isEdit === true ? "flex" : "hidden"
            } flex-col items-center gap-5`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="avatar">
                <div className="w-40 rounded-full ring ring-gray-400">
                  <Image src={defaultAvatar} alt="avatar" />
                </div>
              </div>
              <form onSubmit={changeProfile}>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span>Name : </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={profile.name}
                    onChange={(e) => newProfile("name", e.target.value)}
                    disabled={saveLoading}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span>Bio : </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Bio"
                    disabled={saveLoading}
                    value={profile.biodata ? profile.biodata : ""}
                    onChange={(e) => newProfile("biodata", e.target.value)}
                  ></textarea>
                </div>
                <div className="flex flex-col gap-4 w-60 mt-5">
                  <button
                    className={`${
                      saveLoading ? "hidden" : "block"
                    } btn btn-neutral w-full`}
                    type="submit"
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
                  <button
                    className="btn btn-outline"
                    type="button"
                    onClick={() => setIsEdit(false)}
                    disabled={saveLoading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </section>
        </section>
      </main>
      <ToastContainer />
    </>
  );
};

export default authCheck(Profile);
