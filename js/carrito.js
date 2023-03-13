/*PARA LOGRAR LAS CANTIDADES DE ELEMENTOS SELECCIONADOS 
EN EL CARRITO, NECESITAMOS METER EL CARRITO DENTRO DE UNA FUNCION*/

const productos = [];
/*FUNCION PARA EL CARRITO*/
const pintarCarrito = () => {
  /*SE CREA EL INNERHTML VACÍO PARA QUE NO SE REPITA EL CARRITO CADA VEZ QUE HACEMOS CLICK EN EL MISMO*/
  modalContainer.innerHTML = "";
  /*CON EL DISPLEY FLEX HACEMOS QUE CUANDO SE CIERRA EL MODAL, LO PODEMOS VOLVER A ABRIR Y SIGAN FIGURANDO LOS ELEMENTOS SELECCIONADOS*/
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  /*SE CREA EL HEADER DEL MODAL JUNTO CON SU CLASS*/
  modalHeader.className = "modall-header";
  modalHeader.innerHTML = `
      <h1 class = "modal-header-title">Productos agregados</h1>
      `;
  modalContainer.append(modalHeader);
  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";
  /*HACEMOS QUE APRETANDO LA X SE CIERRE EL MODAL*/
  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  /*SE LLAMA AL CARRITO PARA RECORRERLO*/
  carrito.forEach((productos) => {
    /*SE CREA UN BODY PARA EL MODAL*/
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${productos.img}">
      <h3>${productos.nombre}</h3>
      <p> $${productos.precio}</p>
      <span class="restar"> - </span>
      <p>${productos.cantidad}</p>
      <span class="sumar"> + </span>
      <P>Total: $${productos.cantidad * productos.precio}</p>
      <span class="delete-product"> X </span>
      `;
    /*TANTO EL HEADER COMO EL BODY Y FOOTER(TOTAL) LAS TRES PARTES DEL MODAL, SE ENVÍAN AL MODALCONTAINER CON LA FUNCION APPEND*/
    modalContainer.append(carritoContent);
    /*RESET DEL CONTENIDO DEL CARRITO*/
    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (productos.cantidad !== 1) {
        productos.cantidad--;
      }
      saveLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(productos.id);
    });
  });
  /*LOS ELEMENTOS SELECCIONADOS LOS VA SUMANDO Y DANDO EL TOTAL*/
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalbuying = document.createElement("div");
  totalbuying.className = "total-content";
  totalbuying.innerHTML = `Total a pagar: $${total}`;
  modalContainer.append(totalbuying);
};

verCarrito.addEventListener("click", pintarCarrito);

/*HACEMOS QUE EL BOTON DE ELIMINAR DENTRO DEL MODAL FUNCIONE*/
const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  console.log(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  carritoCounter();
  saveLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.displey = "block";
  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
carritoCounter();
