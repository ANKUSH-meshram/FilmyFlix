import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {RecaptchaVerifier, signInWithPhoneNumber, getAuth} from 'firebase/auth'
import app, { usersRef } from "./firebase/Firebase"; 
import swal from "sweetalert";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs"


const auth = getAuth(app);

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
    
  });
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size' : 'invisible',
      'callback' : (response) => {
        // reCAPTCHA solve, allow signInWithPhoneNumber
      }
    },auth);
  }

  const requestOtp = () => {
    setLoading(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier).then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      swal({
        text: 'OTP sent',
        icon: 'success',
        buttons: false,
        timer: 3000,
      });
      setOtpSent(true);
      setLoading(false);
    }).catch((error) => {
      console.log(error)
    })
  }

  const verifyOtp = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(otp).then((result) => {
        uploadData();
        swal({
          text: 'Successfully Registered',
          icon: "success",
          timer: 3000,
        });
        navigate('/login')
        setLoading(false);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const uploadData = async () => {
    try{
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile,
      });
    }
    catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="w-full flex flex-col items-center mt-10">
    <h3 className="text-xl font-bold">SignUp</h3>
    { otpSent ?
    <>
      <div className="px-6 py-2 w-full md:w-1/3">
        <div className="relative">
          <input
            
            placeholder="OTP"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="px-6 py-2 md:p-2 w-full md:w-1/3">
        <button
          onClick={verifyOtp}
          className="flex justify-center mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full "
        >
          {loading ? <TailSpin height={25} color="white" /> : "Confirm OTP"}
        </button>
      </div>
    </>
    :
      <>
      <div className="py-2 w-full md:w-1/3">
        <div className="relative">
          <input
            placeholder="Name"
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="py-2 w-full md:w-1/3">
        <div className="relative">
          <input
            placeholder="Mobile No"
            type="number"
            id="mobileNo"
            name="mobileNo"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="py-2 w-full md:w-1/3">
        <div className="relative">
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className=" py-2 w-full md:w-1/3">
        <button
          onClick={requestOtp}
          className="flex justify-center mx-auto text-white bg-indigo-500 border-0 py-2 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full "
        >
          {loading ? <TailSpin height={25} color='white'/> : "Request OTP"}
        </button>
      </div>
      </>
    }

      <div>
        <p>Already have an account? 
          <NavLink to={'/login'}>
          <span 
          className="text-blue-500 ml-1">Login
          </span>
          </NavLink>
        </p>
      </div>

      <div id="recaptcha-container">

      </div>
    </div>
  );
};

export default SignUp;
