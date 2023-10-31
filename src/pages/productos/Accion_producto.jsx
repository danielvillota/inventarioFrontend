import React from 'react'
import Punto_entrada from '../../components/Punto_entrada'

const Accion_producto = () => {
    let route_lista = "/productos/lista"
    let listar = "Listar productos"
    let route_registro = "/productos/registro"
  return (
    <Punto_entrada route_lista={route_lista} listar={listar} route_registro={route_registro} registar={"Registrar producto"}/>
  )
}

export default Accion_producto