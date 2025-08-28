import React, { useContext } from "react";
import AuthContext from "./Components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signInUser(email, password);

      navigate("/home/dashboard");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSignIn}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          name="email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          name="password"
        />

        <button className="btn btn-neutral submit mt-4">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
