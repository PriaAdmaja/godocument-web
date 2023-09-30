import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userAction } from "@/redux/slices/user";
import Link from "next/link";

const Login = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const login = async () => {
    try {
      setIsLoading(true);
      const body = {
        email,
        password,
      };
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/users/login`;
      const result = await axios.post(url, body);
      const { token, name, avatar } = result.data.data;
      dispatch(userAction.submitToken(token));
      dispatch(userAction.submitName(name));
      dispatch(userAction.submitAvatar(avatar));
      props.notify("Login success", "success");
    } catch (error) {
      props.notify(error.response.data.msg || "Login failed", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section
      className={`${
        props.tabSelected === "login" ? "flex" : "hidden"
      } flex-col gap-2`}
    >
      <section>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="">Email :</span>
          </label>
          <input
            type="text"
            placeholder="Input your email"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="">Password :</span>
          </label>
          <input
            type="password"
            placeholder="Input your password"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <label className="label">
            <span className="label-text-alt cursor-pointer">
              <Link href={"/forgotpassword"}>Forgot password?</Link>
            </span>
          </label>
        </div>
        {/* <p className="pt-2 cursor-pointer">Forget your password?</p> */}
      </section>
      <button
        className={`btn btn-neutral ${isLoading ? "hidden" : "block"}`}
        type="button"
        onClick={login}
        disabled={email && password ? false : true}
      >
        LOGIN
      </button>
      <button className={`btn btn-neutral ${isLoading ? "block" : "hidden"}`}>
        <span className="loading loading-dots loading-md"></span>
      </button>
    </section>
  );
};

export default Login;
