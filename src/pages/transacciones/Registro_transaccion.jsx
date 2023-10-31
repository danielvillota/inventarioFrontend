import React from 'react'
import { GetTransaccion, SendTransaccion, UpdateTransaccion } from '../../api/Transaccion';
import { GetInventarios } from '../../api/Inventario';
import { useNavigate } from "react-router";
import { NavLink, useParams } from 'react-router-dom'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


const Registro_transaccion = () => {

  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const [inventarios, setInventarios] = useState([]);
  
  const fetchData = async () => {
    const response = await GetInventarios();
    setInventarios(response.inventarios);
    console.log(response.inventarios)
  };

  useEffect(() => {
    fetchData();
  }, []);


  const onSubmit = async (data) => {
     if(params.id){
      await UpdateTransaccion(data,params.id);
      toast.success("Transaccion actualizado con éxito");
      navigate("/transacciones");
    } else {
      await SendTransaccion(data);
      toast.success("Transaccion creado con éxito");
      navigate("/transacciones");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const data = await GetTransaccion(params.id);
        setValue("cantidad", data.transacion.cantidad);
        setValue("inventario_id", data.transaccion.inventario_id);
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
          to={"/transacciones"}
          className="flex justify-end mb-6 transform transition-all duration-200  hover:-translate-y-1 focus:outline-none "
        >
          <BsFillArrowLeftSquareFill size={20} />
        </NavLink>
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Registrar Transaccion
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Cantidad
          </label>
          <input
            autoComplete="off"
            {...register("cantidad")}
            className="mt-1 p-2 w-full border rounded-md"
            type="number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Inventario
          </label>
          <select
            {...register("inventario_id")}
            className="mt-1 p-2 w-full border rounded-md"
            id="inventario"
          >
            <option value="" selected disabled>
              Seleccione un inventario
            </option>
            {inventarios.map((inventario) => (
              <option key={inventario.id} value={inventario.id}>
                {inventario.codigo_ref}
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

export default Registro_transaccion