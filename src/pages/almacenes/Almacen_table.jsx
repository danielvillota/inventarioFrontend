import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GetAlmacenes, DeleteAlmacen } from "../../api/Almacen";
import WarningCard from "../../components/Card";

const Almacen_table = () => {
  const [data, setData] = useState([]);
  const [showWarnings, setShowWarnings] = useState(true);

  const handleCloseWarning = () => {
    setShowWarnings(false);
  };
  const fetchData = async () => {
    const response = await GetAlmacenes();
    setData(response.almacenes);


  };

  useEffect(() => {
    fetchData();
  }, []);

  const shouldShowWarning = data.almacenes.some(almacen => almacen.capacidad_actual < 90);
  setShowWarnings(shouldShowWarning);

  const handleDelete = async (id) => {
    let confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar el almacen ?`
    );
    if (confirmed) {
      try {
        await DeleteAlmacen(id);
        fetchData();
        toast.success("Almacen eliminado con éxito");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex flex-col mt-2">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <div className="flex justify-between">
            <NavLink
              to={`/almacenes`}
              className="text-gray-800 hover:text-gray-400 font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              <FaHome className="text-xl" />
            </NavLink>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Nombre
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Capacidad actual
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Capacidad Total
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Ubicacion
                </th>
                <th className="  text-center text-sm font-medium border-l border-r border-gray-200">
                  Ver productos
                </th>
                <th className="text-center  text-sm font-medium border-l border-r border-gray-200">
                  Editar
                </th>
                <th className="text-center  text-sm font-medium border-l border-r border-gray-200">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((almacenes, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {almacenes.nombre}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {almacenes.capacidad_actual}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {almacenes.capacidad_total}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {almacenes.ubicacion}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    <NavLink to={`/almacenes/detalle/${almacenes.id}`}>
                      <MdProductionQuantityLimits
                        size={30}
                        className=" transform transition-all duration-200  hover:-translate-y-1 focus:outline-none cursor-pointer"
                      />
                    </NavLink>
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    <NavLink 
                    to={`/actualizarAlmacen/${almacenes.id}`}>
                      <AiFillEdit
                        className=" transform transition-all duration-200  hover:-translate-y-1 focus:outline-none cursor-pointer"
                        size={20}
                      />
                    </NavLink>
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    <MdDeleteSweep
                      onClick={() => handleDelete(almacenes.id)}
                      className=" transform transition-all duration-200  hover:-translate-y-1 focus:outline-none cursor-pointer"
                      size={25}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showWarnings && <WarningCard onClose={handleCloseWarning} />}
      </div>
      <div className="flex justify-start gap-6 mt-4 px-8"></div>
    </div>
  );
};

export default Almacen_table;
