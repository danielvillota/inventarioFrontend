import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { ApiDepartamento } from "../../api/Proveedor";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { handleErrors } from "../../components/payloads/Error";

import {
  SendProveedor,
  UpdateProveedor,
  GetProveedor,
} from "../../api/Proveedor";

const Registro = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [departamento, setDepartamento] = useState([]);
  const params = useParams();
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [proveedor, setProveedor] = useState({});
  const [filteredMunicipios, setFilteredMunicipios] = useState([]);

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log(data);
        await UpdateProveedor(data, params.id);
       
      } else {
        await SendProveedor(data);
      }
      toast.success(`Proveedor ${params.id ? 'actualizado' : 'creado'} con éxito`);
      navigate("/proveedores");
    } catch (error) {
      handleErrors(error);
    }
  };

  const getProveedor = async () => {
    try {
      const response = await GetProveedor(params.id);
      setProveedor(response.proveedor);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await ApiDepartamento();
      setDepartamento(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (params.id) {
      getProveedor();
    }
  }, [params.id]);

  useEffect(() => {
    if (Object.keys(proveedor).length > 0) {
      Object.keys(proveedor).forEach((key) => {
        setValue(key, proveedor[key]);
      });

      if (proveedor.hasOwnProperty('region')) {
        setSelectedDepartamento(proveedor.region);
      }

    
    }
  }, [proveedor, setValue]);

  useEffect(() => {
    if (selectedDepartamento) {
      const municipiosFiltrados = departamento.filter(
        (item) => item.departamento === selectedDepartamento
      );
      setFilteredMunicipios(municipiosFiltrados);
    }
  }, [selectedDepartamento, departamento]);

  const uniqueList = Object.values(
    departamento.reduce((obj, item) => {
      if (!obj[item.departamento]) {
        obj[item.departamento] = item;
      }
      return obj;
    }, {})
  );
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-12 rounded-lg bg-white shadow-lg"
      >
        <NavLink
          to={"/proveedores"}
          className="flex justify-end mb-6 transform transition-all duration-200  hover:-translate-y-1 focus:outline-none "
        >
          <BsFillArrowLeftSquareFill size={20} />
        </NavLink>
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Registro Proveedor
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Nombre
          </label>
          <input
            {...register("nombre")}
            autoComplete="off"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Telefono
          </label>
          <input
            {...register("telefono")}
            autoComplete="off"
            className="mt-1 p-2 w-full border rounded-md"
            type="number"
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Departamento
          </label>
          <select
            {...register("region")}
            defaultValue="" // Agrega esto
            onChange={(e) => setSelectedDepartamento(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            id="proveedor"
          >
            <option value="" disabled>
              Seleccione un departamento
            </option>
            {uniqueList.map((item) => (
              <option key={item.c_digo_dane_del_municipio} value={item.departamento}>
                {item.departamento}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            {...register("ciudad")}
            defaultValue="" 
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="" disabled>
              Seleccione un municipio
            </option>
            {filteredMunicipios.map((item) => (
              <option
                key={item.c_digo_dane_del_municipio}
                value={item.municipio}
              >
                {item.municipio}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Direccion
          </label>
          <input
            {...register("direccion")}
            autoComplete="off"
            className="mt-1 p-2 w-full border rounded-md"
            type="text"
          />
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

export default Registro;
