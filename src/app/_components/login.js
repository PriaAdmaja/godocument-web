const Login = ({tabSelected}) => {
    return (
        <section
              className={`${
                tabSelected === "login" ? "flex" : "hidden"
              } flex-col gap-3`}
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
                  />
                </div>
                <p className="pt-2 cursor-pointer">Forget your password?</p>
              </section>
              <button className="btn btn-neutral">LOGIN</button>
            </section>
    )
}

export default Login