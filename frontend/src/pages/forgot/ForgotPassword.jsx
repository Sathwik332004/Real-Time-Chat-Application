import { Link } from "react-router-dom";
import { useState } from "react";
import useResetPassword from "../../hooks/useResetPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, reset } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset(email);
    setEmail("");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:min-w-96 sm:mx-auto">
      <div className="w-full sm:w-96 p-6 rounded-lg shadow-md bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-300">
          Forgot <span className="text-blue-500">Password</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full input input-bordered h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
