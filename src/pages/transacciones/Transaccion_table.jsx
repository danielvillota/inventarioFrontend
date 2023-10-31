import React from 'react'
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GetTransacciones } from '../../api/Transaccion';
import { GetInventario } from '../../api/Inventario';

const Transaccion_table = () => {

  const [data, setData] = useState([]);
  const [inventarioNombres, setInventarioNombres] = useState([]);
  const fetchData = async () => {
    const response = await GetTransacciones();
    setData(response.transacciones);
    console.log(response.transacciones);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const inventarioId = async (id) => {
    if (!inventarioNombres[id]) {
      const response = await GetInventario(id);
      console.log(response)
      setInventarioNombres(prevNombres => ({ ...prevNombres, [id]: response.inventario.codigo_ref }));
    }
  };

  useEffect(() => {
    const uniqueInventarioIds = [...new Set(data.map(item => item.inventario_id))];
    uniqueInventarioIds.forEach(id => {
      inventarioId(id);
    });
  }, [data]);
  

  return (
    <div className="flex flex-col mt-2">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <div className="flex justify-between">
            <NavLink
              to={`/transacciones`}
              className="text-gray-800 hover:text-gray-400 font-semibold py-4 px-4 rounded-full transition duration-300 ease-in-out"
            >
              <FaHome className="text-xl" />
            </NavLink>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
              <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                 Inventario
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((transacciones, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {transacciones.id}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {transacciones.fecha}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {transacciones.cantidad}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {transacciones.total} 
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {inventarioNombres[transacciones.inventario_id] || 'Cargando...'}
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

export default Transaccion_table
//prueba