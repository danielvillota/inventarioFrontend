//import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { GetProductos } from "../../api/Producto";
import toast from "react-hot-toast";
import { GetInventario, SendInventario, UpdateInventario } from "../../api/Inventario";
import { useEffect, useState } from "react";
import { GetAlmacenes } from '../../api/Almacen';
import { useNavigate } from "react-router";
import { handleErrors } from "../../components/payloads/Error";

const Registro_inventario = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const [productos, setProductos] = useState([]);
  const fetchData = async () => {
    const response = await GetProductos();
    setProductos(response.productos);
  };

  const [almacenes, setAlmacenes] = useState([]);
  const fetchDataAlmacenes = async () => {
    const response = await GetAlmacenes();
    setAlmacenes(response.almacenes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataAlmacenes();
  }, []);

  const onSubmit = async (data) => {
     try{

      if(params.id){
        await UpdateInventario(data,params.id);
        toast.success("Inventario actualizado con éxito");
        navigate("/inventarios");
      } else {
        await SendInventario(data);
        toast.success("Inventario creado con éxito");
        navigate("/inventarios");
      }

     }catch (error){
      handleErrors(error)
     }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const data = await GetInventario(params.id);
        setValue("codigo_ref", data.inventario.codigo_ref);
        setValue("cantidad_de_producto", data.inventario.cantidad_de_producto);
        setValue("producto_id", data.inventario.producto_id);
        setValue("almacen_id", data.inventario.almacen_id);

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
          to={"/inventarios"}
          className="flex justify-end mb-6 transform transition-all duration-200  hover:-translate-y-1 focus:outline-none "
        >
          <BsFillArrowLeftSquareFill size={20} />
        </NavLink>
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Registrar Inventario
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Codigo
          </label>
          <input
            autoComplete="off"
            {...register("codigo_ref")}
            className="mt-1 p-2 w-full border rounded-md"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Cantidad
          </label>
          <input
            autoComplete="off"
            {...register("cantidad_de_producto")}
            className="mt-1 p-2 w-full border rounded-md"
            type="number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Producto
          </label>
          <select
            {...register("producto_id")}
            className="mt-1 p-2 w-full border rounded-md"
            id="producto"
          >
            <option value="" selected disabled>
              Seleccione un producto
            </option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Almacen
          </label>
          <select
            {...register("almacen_id")}
            className="mt-1 p-2 w-full border rounded-md"
            id="almacen"
          >
            <option value="" selected disabled>
              Seleccione un almacen
            </option>
            {almacenes.map((almacen) => (
              <option key={almacen.id} value={almacen.id}>
                {almacen.nombre}
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
  )
}

export default Registro_inventario