import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetAlmacen } from "../../api/Almacen";
import { NavLink } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { GetProducto } from "../../api/Producto";
import { GetProveedor } from "../../api/Proveedor";
const Detalle_almacen = () => {
  const { id } = useParams();

  const [almacen, setAlmacen] = useState({});
  const [productos, setProductos] = useState([]);
  const [proveedorNombres, setProveedorNombres] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetAlmacen(id);
      setAlmacen(response.almacen);

      const productosPromises = response.almacen.productos_id.map(
        async (productoId) => {
          return await GetProducto(productoId);
        }
      );
      const productosData = await Promise.all(productosPromises);
      setProductos(productosData);
    };
    fetchData();
  }, [id]);

  const proveedorId = async (id) => {
    if (!proveedorNombres[id]) {
      const response = await GetProveedor(id);
      setProveedorNombres((prevNombres) => ({
        ...prevNombres,
        [id]: response.proveedor.nombre,
      }));
    }
  }

  useEffect(() => {
    const uniqueProveedorIds = [...new Set(productos.map(

      item => 
      item.producto.proveedor_id))];

    uniqueProveedorIds.forEach(id => {
      proveedorId(id);
    });
  }, [productos]);

  

  return (
    <div className="flex flex-col mt-2">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <div className="flex justify-between">

          <h1 className="text-3xl  ml-4 mb-5 font-semibold text-gray-800">
            {almacen.nombre}
          </h1>

            <NavLink
              to={`/almacenes/lista`}
              className="text-gray-800 hover:text-gray-400 font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              <TbArrowBackUp size={35} />
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productos.map((productos, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {productos.producto.nombre}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {productos.producto.codigo}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {productos.producto.descripcion}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {productos.producto.precio}
                  </td>
                  <td className="px-6 py-4 border-l border-r border-gray-200">
                    {proveedorNombres[productos.producto.proveedor_id] || 'Cargando...'}
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

export default Detalle_almacen;
