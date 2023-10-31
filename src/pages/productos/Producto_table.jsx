import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { GetProductos,DeleteProducto } from "../../api/Producto";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { GetProveedor } from "../../api/Proveedor";

const Producto_table = () => {
  const [data, setData] = useState([]);
  const [proveedorNombres, setProveedorNombres] = useState({});
  const fetchData = async () => {
    const response = await GetProductos();
    setData(response.productos);
    console.log(response.productos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const proveedorId = async (id) => {
    if (!proveedorNombres[id]) { // Verifica si ya tenemos el nombre del proveedor
      const response = await GetProveedor(id);
      setProveedorNombres(prevNombres => ({ ...prevNombres, [id]: response.proveedor.nombre }));

  
    }
  };
  useEffect(() => {
    const uniqueProveedorIds = [...new Set(data.map(item => item.proveedor_id))];
    uniqueProveedorIds.forEach(id => {
      proveedorId(id);
    });
  }, [data]);


  const handleDelete = async (id) => {
    let confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto ?`
    );
    if (confirmed) {
      try {
        await DeleteProducto(id);
        fetchData();
        toast.success("Producto eliminado con éxito");
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
              to={`/productos`}
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
                  Codigo
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Descripcion
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Precio unitario
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium border-l border-r border-gray-200">
                  Proveedor
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
              {data.map((productos, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {productos.nombre}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {productos.codigo}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {productos.descripcion}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {productos.precio}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                  {proveedorNombres[productos.proveedor_id] || 'Cargando...'}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    <NavLink to={`/actualizarProducto/${productos.id}`}>
                      <AiFillEdit
                        className=" transform transition-all duration-200  hover:-translate-y-1 focus:outline-none cursor-pointer"
                        size={20}
                      />
                    </NavLink>
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    <MdDeleteSweep
                      onClick={() => handleDelete(productos.id)}
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

export default Producto_table;
