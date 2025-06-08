import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:min-w-96 sm:mx-auto">
      <div className="w-full sm:w-96 p-6 rounded-lg shadow-md bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-500">ChatterBox</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link
            to={"/forgot"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Forgot Password?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>

          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
