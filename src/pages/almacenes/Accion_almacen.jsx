import React from 'react'
import Punto_entrada from '../../components/Punto_entrada'
const Accion_almacen = () => {
    let route_lista = "/almacenes/lista"
    let listar = "Listar almacenes"
    let route_registro = "/almacenes/registro"
  return (
    <Punto_entrada route_lista={route_lista} listar={listar} route_registro={route_registro} registar={"Registrar almacen"}/>
  )
}

export default Accion_almacen