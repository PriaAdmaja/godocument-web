import { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const register = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const body = {
        email,
        name,
        password,
        role: 1,
      };
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/users/register`;
      const result = await axios.post(url, body);
      props.notify(result.data.msg, "success");
      setEmail(null);
      setPassword(null);
      setName(null);
      e.target.reset();
    } catch (error) {
      props.notify(error.response.data.msg || "Login failed", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={register}
      className={`${
        props.tabSelected === "register" ? "flex" : "hidden"
      } flex-col`}
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
            <span className="">Name :</span>
          </label>
          <input
            type="text"
            placeholder="Input your email"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setName(e.target.value)}
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
            className={`input input-bordered w-full max-w-xs ${password !== '' && password?.length < 8 ? 'input-error' : ''}`}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <label className={`label ${password !== '' && password?.length < 8 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="label-text-alt text-red-600">Minimum 8 characters</span>
          </label>
        </div>
      </section>
      <button
        className={`btn btn-neutral ${isLoading ? "hidden" : "block"}`}
        type="submit"
        // onClick={register}
        disabled={email && name && password?.length >= 8 ? false : true}
      >
        REGISTER
      </button>
      <button className={`btn btn-neutral ${isLoading ? "block" : "hidden"}`}>
        <span className="loading loading-dots loading-md"></span>
      </button>
    </form>
  );
};

export default Register;
