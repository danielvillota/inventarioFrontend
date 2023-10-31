import React, { useEffect,useState } from "react";
import {  useForm } from "react-hook-form";
import { GetProveedores } from "../../api/Proveedor";
import toast from "react-hot-toast";
import { NavLink,useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { handleErrors } from "../../components/payloads/Error";
import { SendProducto, UpdateProducto, GetProducto } from "../../api/Producto";
export const Registro_producto = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [proveedores, setProveedores] = useState([]);
  const fetchData = async () => {
    const response = await GetProveedores();
    setProveedores(response.provedores);
  };

  useEffect(() => {
    fetchData();
  }, []);



  const onSubmit = async (data) => {
    try {
     if(params.id){
      await UpdateProducto(data,params.id);
      toast.success("Producto actualizado con éxito");
      navigate("/productos");
    } else {
      await SendProducto(data);
      toast.success("Producto creado con éxito");
      navigate("/productos");
    }
    } catch (error) {
      handleErrors(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const data = await GetProducto(params.id);
        setValue("nombre", data.producto.nombre);
        setValue("codigo", data.producto.codigo);
        setValue("descripcion", data.producto.descripcion);
        setValue("precio", data.producto.precio);
        setValue("precio", data.producto.proveedor_id);
        setValue("proveedor_id", data.producto.proveedor_id);

      }
    };
  
    fetchData();
  }, [params.id, setValue, register]); 

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-12 rounded-lg bg-white shadow-lg"
      >
        <NavLink
          to={"/productos"}
          className="flex justify-end mb-6 transform transition-all duration-200  hover:-translate-y-1 focus:outline-none "
        >
          <BsFillArrowLeftSquareFill size={20} />
        </NavLink>
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Registrar Producto
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Nombre
          </label>
          <input
            autoComplete="off"
            {...register("nombre")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Codigo
          </label>
          <input
            autoComplete="off"
            {...register("codigo")}
            className="mt-1 p-2 w-full border rounded-md"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Descripcion
          </label>
          <input
            autoComplete="off"
            {...register("descripcion")}
            className="mt-1 p-2 w-full border rounded-md"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Precio
          </label>
          <input
            autoComplete="off"
            {...register("precio")}
            className="mt-1 p-2 w-full border rounded-md"
            type="number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Proveedor
          </label>
          <select
            {...register("proveedor_id")}
            className="mt-1 p-2 w-full border rounded-md"
            id="proveedor"
          >
            <option value="" selected disabled>
              Seleccione un proveedor
            </option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}
              </option>
            ))}
          </select>
        </div>
        {params.id ? (
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            type="submit"
            value="enviar"
          >
            Actualizar
          </button>
        ) : (
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            type="submit"
            value="enviar"
          >
            Registrar
          </button>
        )}
      </form>
    </div>
  );
};
