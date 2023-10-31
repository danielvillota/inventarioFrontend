import React from 'react'
import { NavLink } from "react-router-dom";
const Punto_entrada = ({route_lista,listar,registar,route_registro}) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-slate-300 to-white ">
    <div className="bg-white shadow-lg p-8 rounded-lg text-center w-[684px] h-96 flex flex-col justify-around">
      <h1 className="text-3xl font-semibold mb-6">Acciones</h1>
      <NavLink
        className="block bg-gray-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-black"
        to={route_lista}
      >
        {listar}
      </NavLink>
      <NavLink
        className="block bg-red-300 text-white py-2 px-4 rounded-md mb-4 hover:bg-red-600"
        to={"/"}
      >
        Volver al menu
      </NavLink>
      <NavLink
        className="block bg-green-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-green-600"
        to={route_registro}
      >
        {registar}
      </NavLink>

    </div>
  </div>
  )
}

export default Punto_entrada