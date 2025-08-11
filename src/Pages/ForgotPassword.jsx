import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Google from "../assets/google.webp";
import { Bounce, toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { handleGoogleLogin, resetPassword } = useAuth();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    resetPassword(email)
      .then(() => {
        setEmail("");
        toast.success("Password reset email sent!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
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
        Reset Password
      </h1>

      <div className="w-full rounded-xl border border-[#2A9D8F] p-5 bg-[#264653] text-white shadow hover:shadow-xl transition duration-300 ease-in-out lg:w-1/2 mx-auto">
        <form onSubmit={handleFormSubmit} className="placeholder:text-white">
          <div className="grid grid-cols-5 gap-2 items-center mb-4">
            <label className="block font-semibold md:text-right col-span-5 md:col-span-1">
              Email:
            </label>
            <input
              type="email"
              className="border border-[#2A9D8F] rounded p-2 validator w-full col-span-5 md:col-span-3"
              required
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="validator-hint mt-0 col-span-5 md:col-span-1">
              Enter valid email address
            </p>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </div>
        </form>

        <progress className="progress h-0.5"></progress>

        <div
          className="w-full flex justify-between items-center border border-[#2A9D8F] rounded-full p-2 cursor-pointer mt-4 hover:bg-[#2A9D8F]"
          onClick={handleGoogleLogin}
        >
          <img src={Google} alt="Google" className="w-8 h-8 rounded-full" />
          <p className="font-semibold">Continue with Google</p>
          <span></span>
        </div>
      </div>
    </div>
  );
}
