import React from "react";
import { NavLink } from "react-router-dom";
const Button = ({ text,route }) => {
  return (
    <NavLink
    to={route}
      className="mt-14  w-40 h-12 text-center transform transition-all 
    duration-200 hover:-translate-y-1
     focus:outline-none bg-gray-600/30 
      text-slate-950 font-semibold hover:text-white py-2 px-4 border-2
     hover:border-transparent rounded"
    >
     <p className="font-bold text-xl ">{text}</p> 
    </NavLink>
  );
};

export default Button;
