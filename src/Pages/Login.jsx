import React, { useState } from "react";
import LoginImage from "../assets/login.jpg";
import { Link } from "react-router";
import Google from "../assets/google.webp";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const { setUser, signIn } = useAuth();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    signIn(email, password, remember).then((user) => {
      setUser(user.user);
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-3 lg:mb-5 text-center lg:text-left">
        Login
      </h1>
      <div className="grid flex-col-1 lg:grid-cols-2 justify-center items-center gap-5 lg:gap-10">
        <div className="w-full rounded-xl border border-[#2A9D8F] p-5 bg-[#264653] text-white shadow hover:shadow-xl transition duration-300 ease-in-out">
          <form onSubmit={handleFormSubmit} className="placeholder:text-white">
            <div className="grid grid-cols-5 gap-2 items-center mb-4">
              <label className="block font-semibold md:text-right col-span-5 md:col-span-1">
                Email:
              </label>
              <input
                type="email"
                className="border border-[#2A9D8F] rounded p-2 validator w-full col-span-5 md:col-span-3"
                required
                placeholder="Enter Eamil"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="validator-hint mt-0 col-span-5 md:col-span-1">
                Enter valid email address
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2 items-center mb-4">
              <label className="block font-semibold md:text-right col-span-5 md:col-span-1">
                Password:
              </label>
              <input
                type="password"
                className="border border-[#2A9D8F] rounded p-2 validator w-full col-span-5 md:col-span-3"
                required
                placeholder="Enter Password"
                minLength="6"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="validator-hint mt-0 col-span-5 md:col-span-1">
                Must be more than 6 characters, including number, lowercase
                letter, uppercase letter
              </p>
            </div>

            <div className="grid grid-cols-5 md:gap-2 items-center mb-4">
              <input
                type="checkbox"
                className="checkbox validator md:ms-auto"
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="block col-span-4 md:col-span-3 w-full">
                Remember me
              </label>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="text-center mt-4">
              <Link
                to="/forgot-password"
                className="text-[#E76F51] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#E76F51] hover:underline">
                Register
              </Link>{" "}
              here.
            </p>
          </form>

          <progress className="progress h-0.5"></progress>

          <div className="w-full flex justify-between items-center border border-[#2A9D8F] rounded-full p-2 cursor-pointer mt-4 hover:bg-[#2A9D8F]">
            <img src={Google} alt="Google" className="w-8 h-8 rounded-full" />
            <p className="font-semibold">Continue with Google</p>
            <span></span>
          </div>
        </div>
        <div className="hidden lg:block">
          <img
            src={LoginImage}
            alt="Register"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
