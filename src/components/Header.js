import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AppState } from "../App";

const Header = () => {
    const useAppState = useContext(AppState);

  return (
    <div className="sticky top-0 z-50 bg-slate-800 w-full flex justify-between items-center py-3 px-10 border-b-2 border-gray-500">
      <NavLink to={"/"}>
        <h3 className="text-3xl text-red-600 font-bold font-['Oleo_Script'] tracking-wider cursor-pointer">
          Filmy<span className="text-[#efefe7]">Flix</span>
        </h3>
      </NavLink>

      {useAppState.login ? 
        <NavLink to={"/addmovie"}>
        <Button>
          <span className="flex items-center px-2 text-gray-100">
            <AddIcon className="mr-1 flex" />
            Add Movie
          </span>
        </Button>
      </NavLink>
      :
      <NavLink to={"/login"}>
        <button className="bg-blue-600 py-2 px-3 rounded-md outline-none border-none drop-shadow-lg hover:bg-blue-800 transition-all duration-300 font-semibold text-lg">
          <span className="flex items-center px-2 text-gray-900">
            LogIn
          </span>
        </button>
    </NavLink>
      }
    </div>
  );
};

export default Header;
