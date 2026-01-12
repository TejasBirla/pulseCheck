import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import pulseCheckLogo from "../assets/pulseCheck_logo.png";

export default function Login() {
  const { loginController, loading } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginController(userData);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-292.5 mx:auto">
        <Link to="/">
          <img src={pulseCheckLogo} alt="logo" className="h-35 w-45 fixed" />
        </Link>
      </div>
      <div className="flex flex-col items-center pt-30">
        <h2 className="text-[28px] text-center font-bold">Login</h2>
        <p className="text-center">
          Access your dashboard to track uptime and manage your monitored sites.
        </p>
        <div className="mt-6 py-6">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-112.5 border p-4">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="test@example.com"
                value={userData.email}
                onChange={handleChange}
                className="input w-full"
              />

              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={userData.password}
                onChange={handleChange}
                className="input w-full"
              />
              <Link to="/signup" className="link link-light mt-3">
                Create new an account?
              </Link>
              <button
                className="btn btn-neutral mt-4 flex items-center justify-center gap-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
