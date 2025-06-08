import { useState } from "react";
import useReset from "../../hooks/useReset";

const ResetPassword = () => {
  const { loading, reset } = useReset();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset(password, confirmPassword);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:min-w-96 sm:mx-auto">
      <div className="w-full sm:w-96 p-6 rounded-lg shadow-md bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-300">
          Reset <span className="text-blue-500">Password</span>
        </h1>

        <form onSubmit={handleSubmit}>
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
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Your password"
              className="w-full input input-bordered h-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-block btn-sm mt-4" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Reset"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
