import React from 'react'
import Punto_entrada from '../../components/Punto_entrada'

const Accion_transaccion = () => {
    let route_lista = "/transacciones/lista"
    let listar = "Listar transacciones"
    let route_registro = "/transacciones/registro"
  return (
    <Punto_entrada route_lista={route_lista} listar={listar} route_registro={route_registro} registar={"Registrar transaccion"}/>
  )
}

export default Accion_transaccion