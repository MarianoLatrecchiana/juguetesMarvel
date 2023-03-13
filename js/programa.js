/*CAPTURAR LOS ID DEL HTML*/
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");
/*ARAY VACIO DONDE SE AGREGAN LOS PRODUCTOS SELECCIONADOS*/
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/*TRAIGO CON FETCH/ASYNC AWAIT LA LISTA DE PRODUCTOS*/
const traerproductos = async () => {
  const response = await fetch("productos.json");
  const data = await response.json();

  data.forEach((productos) => {
    let contenedor = document.createElement("div");
    contenedor.className = "card";
    /*EL INNERHTML ES LO QUE INDICA QUE VAMOS A TENER DENTRO DE CONTENEDOR*/
    contenedor.innerHTML = `
      <img src="${productos.img}">
      <h3>${productos.nombre}</h3>
      <p class="price">$${productos.precio}</p>
  `;
    /*LAS ETIQUETAS HTML CREADA ARRIBA LA LLAMO PARA APLICARLAS*/
    shopContent.append(contenedor);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "Comprar";
    /*LLAMO AL BUTTON PARA APLICARLO*/
    contenedor.append(comprar);

    /*COMENZAR A DARLE FUNCIONALIDAD A LOS BOTONES*/
    /*EVENTOS*/
    comprar.addEventListener("click", () => {
      /*PARA QUE NO SE REPITAN LOS PRODUCTOS EN EL CARRITO Y SE SUMEN LAS CANTIDADES*/
      const repeat = carrito.some(
        (repeatProductos) => repeatProductos.id === productos.id
      );
      /*SE SUMAN LOS PRODUCTOS IGUALES EN VEZ DE REPETIRSE*/
      if (repeat) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡Agregaste tu juguete!",
          showConfirmButton: false,
          timer: 1000,
        });
        carrito.map((prod) => {
          if (prod.id === productos.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: productos.id,
          img: productos.img,
          nombre: productos.nombre,
          precio: productos.precio,
          cantidad: productos.cantidad,
        });
        console.log(carrito);
        console.log(carrito.length);
        carritoCounter();
        saveLocal();
      }
    });
  });
};
traerproductos();

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
