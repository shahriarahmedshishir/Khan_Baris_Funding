import { useContext } from "react";
import AuthContext from "./Components/context/AuthContext";

const Register = () => {
  const { CreateUser } = useContext(AuthContext);
  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await CreateUser(email, password);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };
  return (
    <form
      onSubmit={handleSignUp}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <legend className="fieldset-legend">Login</legend>

      <label className="label">Email</label>
      <input type="email" className="input" placeholder="Email" name="email" />

      <label className="label">Password</label>
      <input
        type="password"
        className="input"
        placeholder="Password"
        name="password"
      />

      <button className="btn btn-neutral submit mt-4">Login</button>
    </form>
  );
};

export default Register;
