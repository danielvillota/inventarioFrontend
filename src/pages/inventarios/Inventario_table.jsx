import React from 'react'
import { useEffect, useState } from "react";
import { DeleteInventario, GetInventarios } from "../../api/Inventario";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { GetAlmacen } from "../../api/Almacen";
import { GetProducto } from "../../api/Producto";
import toast from "react-hot-toast";


const Inventario_table = () => {

  const [data, setData] = useState([]);
  const [almacenNombres, setAlmacenNombres] = useState([]);
  const [productoNombres, setProductoNombres] = useState([]);
  const fetchData = async () => {
    const response = await GetInventarios();
    setData(response.inventarios);
    console.log(response.inventarios);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const almacenId = async (id) => {
    if (!almacenNombres[id]) { // Verifica si ya tenemos el nombre del proveedor
      const response = await GetAlmacen(id);
      setAlmacenNombres(prevNombres => ({ ...prevNombres, [id]: response.almacen.nombre }));
    }
  };
  useEffect(() => {
    const uniqueAlmacenIds = [...new Set(data.map(item => item.almacen_id))];
    uniqueAlmacenIds.forEach(id => {
      almacenId(id);
    });
  }, [data]);

  const productoId = async (id) => {
    if (!productoNombres[id]) { // Verifica si ya tenemos el nombre del proveedor
      const response = await GetProducto(id);
      setProductoNombres(prevNombres => ({ ...prevNombres, [id]: response.producto.nombre }));
    }
  };

  useEffect(() => {
    const uniqueProductoIds = [...new Set(data.map(item => item.producto_id))];
    uniqueProductoIds.forEach(id => {
      productoId(id);
    });
  }, [data]);
  

  const handleDelete = async (id) => {
    let confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar el inventario ?`
    );
    if (confirmed) {
      try {
        await DeleteInventario(id);
        fetchData();
        toast.success("Inventario eliminado con éxito");
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
              to={`/inventarios`}
              className="text-gray-800 hover:text-gray-400 font-semibold py-4 px-4 rounded-full transition duration-300 ease-in-out"
            >
              <FaHome className="text-xl" />
            </NavLink>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                  Codigo
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                 Producto
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                  Almacen
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                  Editar
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium border-l border-r border-gray-200">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((inventarios, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {inventarios.fecha_de_creacion}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {inventarios.codigo_ref}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {inventarios.cantidad_de_producto}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {inventarios.subtotal} 
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {productoNombres[inventarios.producto_id] || 'Cargando...'}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {almacenNombres[inventarios.almacen_id] || 'Cargando...'}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    <NavLink to={`/actualizarInventario/${inventarios.id}`}>
                      <AiFillEdit
                        className=" transform transition-all duration-200  hover:-translate-y-1 focus:outline-none cursor-pointer"
                        size={20}
                      />
                    </NavLink>
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    <MdDeleteSweep
                      onClick={() => handleDelete(inventarios.id)}
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

export default Inventario_table