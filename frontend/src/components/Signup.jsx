import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import pulseCheckLogo from "../assets/PulseCheck_logo.png";
import AuthContext from "../contexts/AuthContext.jsx";

export default function Signup() {
  const { signupController, loading } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    user: "",
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
    signupController(userData);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-292.5 mx:auto">
        <Link to="/">
          <img src={pulseCheckLogo} alt="logo" className="h-35 w-45 fixed" />
        </Link>
      </div>
      <div className="flex flex-col items-center pt-30">
        <h2 className="text-[28px] text-center font-bold">Sign Up</h2>
        <p className="text-center">
          Create an account to start monitoring your websites and APIs
          instantly.
        </p>
        <div className="mt-6 py-6">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-112.5 border p-4">
              <label className="label">Name</label>
              <input
                type="name"
                name="user"
                placeholder="John Doe"
                value={userData.user}
                onChange={handleChange}
                className="input w-full"
              />
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
              <Link to="/login" className="link link-light mt-3">
                Already have an account?
              </Link>
              <button
                className="btn btn-neutral mt-4 flex items-center justify-center gap-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    <span>Signing up...</span>
                  </>
                ) : (
                  "Signup"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
