//import React from 'react'
import Punto_entrada from '../../components/Punto_entrada'

const Accion_inventario = () => {
    let route_lista = "/inventarios/lista"
    let listar = "Listar inventarios"
    let route_registro = "/inventarios/registro"
  return (
    <Punto_entrada route_lista={route_lista} listar={listar} route_registro={route_registro} registar={"Registrar inventario"}/>
  )
}

export default Accion_inventario