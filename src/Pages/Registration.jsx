import React, { useState } from "react";
import Register from "../assets/register.jpg";
import { Link, useNavigate } from "react-router";
import Google from "../assets/google.webp";
import { useAuth } from "../context/AuthContext";
import { Bounce, toast } from "react-toastify";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser, createUser, updateUserData } = useAuth();

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password && value !== password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (error) {
      return;
    }

    createUser(email, password)
      .then((user) => {
        setUser(user.user);
        toast.success("Registration successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
        updateUserData(name);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-3 lg:mb-5 text-center lg:text-left">
        Create an account
      </h1>
      <div className="grid flex-col-1 lg:grid-cols-2 justify-center items-center gap-5 lg:gap-10">
        <div className="hidden lg:block">
          <img
            src={Register}
            alt="Register"
            className="w-full h-auto rounded-2xl"
          />
        </div>
        <div className="w-full rounded-xl border border-[#2A9D8F] p-5 bg-[#264653] text-white placeholder:text-white shadow hover:shadow-xl transition duration-300 ease-in-out">
          <form onSubmit={handleFormSubmit} className="placeholder:text-white">
            <div className="grid grid-cols-5 gap-2 items-center mb-4">
              <label className="block font-semibold md:text-right col-span-5 md:col-span-1">
                Name:
              </label>
              <input
                type="text"
                className="border border-[#2A9D8F] rounded p-2 validator w-full col-span-5 md:col-span-3"
                required
                placeholder="Enter Name"
                pattern="[A-Za-z]+"
                minLength="3"
                maxLength="30"
                title="Only letters (A–Z, a–z)"
                onChange={(e) => setName(e.target.value)}
              />
              <p className="validator-hint mt-0 col-span-5 md:col-span-1">
                Must be 3 to 30 characters, containing only letters
              </p>
            </div>
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
            <div className="grid grid-cols-5 gap-2 items-center mb-4">
              <label className="block font-semibold md:text-right col-span-5 md:col-span-1">
                Confirm Password:
              </label>
              <input
                type="password"
                className="border rounded p-2 validator w-full col-span-5 md:col-span-3 border-[#2A9D8F]"
                required
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {error && (
                <p className="text-xs text-red-400 col-span-5 md:col-span-1">
                  {error}
                </p>
              )}
            </div>
            <div className="grid grid-cols-5 md:gap-2 items-center mb-4">
              <input
                type="checkbox"
                className="checkbox validator md:ms-auto"
                required
                title="Required"
              />
              <label className="block col-span-4 md:col-span-3 w-full">
                I agree to the terms and conditions
              </label>
              <p className="validator-hint">Required</p>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-[#E76F51] hover:underline">
                Login
              </Link>{" "}
              instead.
            </p>
          </form>

          <progress className="progress h-0.5"></progress>

          <div className="w-full flex justify-between items-center border border-[#2A9D8F] rounded-full p-2 cursor-pointer mt-4 hover:bg-[#2A9D8F]">
            <img src={Google} alt="Google" className="w-8 h-8 rounded-full" />
            <p className="font-semibold">Continue with Google</p>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
