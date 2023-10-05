"use client";
import { Fragment, useState } from "react";
import Login from "./_components/login";
import Register from "./_components/register";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loggedIn from "@/utils/private-route/loggedId";

function Home() {
  const [tabSelected, setTabSelected] = useState("login");

  const notify = (msg, type) => {
    if (type === "success") {
      return toast.success(msg);
    }
    toast.error(msg);
  };

  return (
    <Fragment>
      <main className="flex flex-col justify-center items-center p-20 gap-10">
        <p className="text-5xl font-bold">GoDocument</p>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="tabs ">
              <a
                className={`tab tab-bordered text-xl font-semibold ${
                  tabSelected === "login" ? "tab-active" : ""
                }`}
                onClick={() => setTabSelected("login")}
              >
                Login
              </a>
              <a
                className={`tab tab-bordered text-xl font-semibold ${
                  tabSelected === "register" ? "tab-active" : ""
                }`}
                onClick={() => setTabSelected("register")}
              >
                Register
              </a>
            </div>
            <Login tabSelected={tabSelected} notify={notify} />
            <Register
              tabSelected={tabSelected}
              notify={notify}
              selectTab={setTabSelected}
            />
          </div>
        </div>
      </main>
      <ToastContainer />
    </Fragment>
  );
}

export default loggedIn(Home);
