import { Navigate, Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import Registro from "./pages/proveedores/Registro";
import Accion_proveedor from "./pages/proveedores/Accion_proveedor";
import Accion_producto from "./pages/productos/accion_producto";
import { Registro_producto } from "./pages/productos/Registro_producto";
import Accion_almacen from "./pages/almacenes/Accion_almacen";
import Registrar_almacen from "./pages/almacenes/Registrar_almacen";
import Accion_inventario from "./pages/inventarios/Accion_inventario";
import Registro_inventario from "./pages/inventarios/Registro_inventario";
import Accion_transaccion from "./pages/transacciones/Accion_transaccion";
import Registro_transaccion from "./pages/transacciones/Registro_transaccion";
import Provedor_table from "./pages/proveedores/Provedor_table";
import Producto_table from "./pages/productos/Producto_table";
import Almacen_table from "./pages/almacenes/Almacen_table";
import Detalle_almacen from "./pages/almacenes/Detalle_almacen";
import Inventario_table from "./pages/inventarios/Inventario_table";
import Transaccion_table from "./pages/transacciones/Transaccion_table";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="proveedores" element={<Accion_proveedor />} />
      <Route path="proveedores/registro" element={<Registro />} />
      <Route path = "actualizarProveedor/:id" element={<Registro/>}/>
      <Route path="proveedores/lista" element={<Provedor_table />} />

      <Route path="productos" element={<Accion_producto />} />
      <Route path="productos/registro" element={<Registro_producto />} />
      <Route path="productos/lista" element={<Producto_table />} />
      <Route path = "actualizarProducto/:id" element={<Registro_producto/>}/>

      <Route path="almacenes" element={<Accion_almacen />} />
      <Route path="almacenes/registro" element={<Registrar_almacen />} />
      <Route path="almacenes/lista" element={<Almacen_table />} />
      <Route path="almacenes/detalle/:id" element={<Detalle_almacen />} />
      <Route path = "actualizarAlmacen/:id" element={<Registrar_almacen/>}/>


      <Route path="inventarios" element={<Accion_inventario />} />
      <Route path="inventarios/registro" element={<Registro_inventario />} />
      <Route path="inventarios/lista" element={<Inventario_table />} />
      <Route path = "actualizarInventario/:id" element={<Registro_inventario/>}/>

      <Route path="transacciones" element={<Accion_transaccion />} />
      <Route path="transacciones/registro" element={<Registro_transaccion />} />
      <Route path="transacciones/lista" element={<Transaccion_table />} />
    </Routes>
  );
};

export default Router;
