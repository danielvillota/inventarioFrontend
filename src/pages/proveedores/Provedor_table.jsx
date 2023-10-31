import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GetProveedores } from "../../api/Proveedor";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { DeleteProveedor } from "../../api/Proveedor";

const Provedor_table = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await GetProveedores();
    setData(response.provedores);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const handleDelete = async (id) => {
    let confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar el proveedor ?`
    );
    if (confirmed) {
      try {
        await DeleteProveedor(id);
        fetchData();
        toast.success("Proveedor eliminado con éxito");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="flex flex-col mt-2">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <div className="flex justify-between">
            <NavLink
              to={`/proveedores`}
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
                  Telefono
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Region
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Ciudad
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Direccion
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Editar
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((provedores, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {provedores.nombre}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {provedores.telefono}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {provedores.region}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {provedores.ciudad}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {provedores.direccion}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    <NavLink to={`/actualizarProveedor/${provedores.id}`}>
                      <AiFillEdit
                        className=" transform transition-all duration-200  hover:-translate-y-1 focus:outline-none cursor-pointer"
                        size={20}
                      />
                    </NavLink>
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    <MdDeleteSweep
                      onClick={() => handleDelete(provedores.id)}
                      className=" transform transition-all duration-200  hover:-translate-y-1 focus:outline-none cursor-pointer"
                      size={25}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-start gap-6 mt-4 px-8"></div>
    </div>
  );
};

export default Provedor_table;
