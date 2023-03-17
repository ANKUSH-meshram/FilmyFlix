import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "./firebase/Firebase";
import bcrypt from 'bcryptjs'
import {AppState} from '../App'

const Login = () => {
  const navigate = useNavigate();
  const  useAppState = useContext(AppState);
  const [form, setForm] = useState({
    mobile: "",
    password: "",

  });
  const [loading, setLoading] = useState(false)
  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where('mobile', "==", form.mobile));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if(isUser) {
          useAppState.setLogin(true);
          useAppState.setUserName(_data.name);
          swal({
            title:  "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000,
          })
          navigate('/')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000,
          })
        }
      })

      

    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      })
    }
    setLoading(false);
  }

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h3 className="text-xl font-bold">LogIn</h3>

      <div className="px-6 py-2 w-full md:w-1/3">
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

      <div className="px-6 py-2 w-full md:w-1/3">
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

      <div className="px-6 py-2 md:p-2 w-full md:w-1/3">
        <button
          onClick={login}
          className="flex justify-center mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full "
        >
          {loading ? <TailSpin height={25} color="white" /> : "LogIn"}
        </button>
      </div>

      <div>
        <p>Do not have account? 
          <NavLink to={'/signup'}>
          <span 
          className="text-blue-500 ml-1">Sign Up
          </span>
          </NavLink>
        </p>
      </div>

    </div>
  );
};

export default Login;
