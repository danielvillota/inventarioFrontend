import React from 'react'
import Punto_entrada from '../../components/Punto_entrada'

const Accion_proveedor = () => {
    let route_lista = "/proveedores/lista"
    let listar = "Listar proveedores"
    let route_registro = "/proveedores/registro"
  return (
    <Punto_entrada route_lista={route_lista} listar={listar} route_registro={route_registro} registar={"Registrar proveedor"}/>
  )
}

export default Accion_proveedor