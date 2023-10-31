import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

import Button from "../components/Button";

const Menu = () => {
  const sliders = [
    {
      url: "https://uploadgerencie.com/imagenes/contabilizar-devoluciones-compras.png",
      name: "Proovedor",
      route: "/proveedores",
    },
    {
      url: "https://kinsta.com/es/wp-content/uploads/sites/8/2020/10/alternativas-de-paypal.png",
      name: "Producto",
      route: "/productos",
    },
    {
      url: "https://www.supergenericosdelvalle.com/wp-content/uploads/2023/02/contabilizar-devolucion-venta-1.png",
      name: "Almacen",
      route: "/almacenes",
    },
    {
      url : "https://pululart.es/blog/wp-content/uploads/2021/03/Ejemplos-de-pol%C3%ADticas-de-devoluci%C3%B3n-de-dinero-en-compra-online-eficaces-1024x791.jpg",
      name : "Inventario",
      route : "/inventarios"
    },
    {
      url : "https://uploadgerencie.com/imagenes/devolver-dinero-compra.png",
      name : "Transaccion",
      route : "/transacciones"
    }
    
  ];
  const [current, setCurrent] = useState(0);
  const prevSlide = () => {
    let isFirstSlide = current === 0;
    let newIndex = isFirstSlide ? sliders.length - 1 : current - 1;
    setCurrent(newIndex);
  };

  const nextSlide = () => {
    let isLastSlide = current === sliders.length - 1;
    let newIndex = isLastSlide ? 0 : current + 1;
    setCurrent(newIndex);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen relative">
        {/* Fondo desenfocado */}
        <div
          style={{ backgroundImage: `url(${sliders[current].url})` }}
          className="absolute inset-0 bg-center bg-cover filter blur-md opacity-50 transition-all duration-500 ease-in-out"
        ></div>

        <main className="max-w-[1300px] h-[780px] w-full m-auto py-16 px-4 relative group">
          <section
            style={{ backgroundImage: `url(${sliders[current].url})` }}
            className="w-full h-full rounded-2xl bg-center bg-cover shadow-2xl relative z-10 transition-all duration-500 ease-in-out"
          >
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer ">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer ">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className="flex top-4 justify-center py-2">
              {sliders.map((slide, index) => (
                <div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="text-2xl cursor-pointer"
                >
                  <RxDotFilled />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                text={sliders[current].name}
                route={sliders[current].route}
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Menu;
