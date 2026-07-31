const url =
    "https://backservicetest-g8emcvdff0fqe2b8.canadacentral-01.azurewebsites.net/api/producto";

const contenedorProductos =
    document.getElementById("contenedor-productos");

const contadorCarrito =
    document.getElementById("contadorCarrito");

let carrito = 0;

async function cargarProductos() {
    try {
        contenedorProductos.innerHTML = `
            <div class="col-12 text-center">
                <p>Cargando productos...</p>
            </div>
        `;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        contenedorProductos.innerHTML = "";

        productos.forEach((producto) => {
            let precioHTML = "";

            if (
                producto.enOferta === true &&
                producto.precioOferta != null
            ) {
                precioHTML = `
                    <span class="product-price">
                        Q${parseFloat(producto.precioOferta).toFixed(2)}
                    </span>

                    <small class="text-muted text-decoration-line-through ms-2">
                        Q${parseFloat(producto.precio).toFixed(2)}
                    </small>
                `;
            } else {
                precioHTML = `
                    <span class="product-price">
                        Q${parseFloat(producto.precio).toFixed(2)}
                    </span>
                `;
            }
//parseFloat sirve para colocar decimales .00
            const columna = document.createElement("div");

            columna.className =
                "col-sm-12 col-md-4 mb-4";

            columna.innerHTML = `
                <div class="card product-card h-100">

                    <img
                        src="${producto.imagen}"
                        class="card-img-top product-image img-fluid"
                        alt="${producto.nombre}">

                    <div class="card-body d-flex flex-column">

                        <span class="product-category">
                            ${producto.categoriaNombre ?? "Sin categoría"}
                        </span>

                        <h3 class="card-title product-name">
                            ${producto.nombre}
                        </h3>

                        <p class="product-description">
                            ${producto.descripcion}
                        </p>

                        <div class="mb-3">
                            ${precioHTML}
                        </div>

                        <button class="btn btn-add-cart mt-auto agregar-carrito">
                            <i class="bi bi-cart-plus me-2"></i>
                            Agregar al carrito
                        </button>

                    </div>

                </div>
            `;

            const boton =
                columna.querySelector(".agregar-carrito");

            boton.addEventListener("click", () => {
                carrito++;

                if (contadorCarrito) {
                    contadorCarrito.textContent = carrito;
                }
            });

            contenedorProductos.appendChild(columna);
        });

    } catch (error) {
        console.error(
            "Error al cargar productos:",
            error
        );

        contenedorProductos.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger text-center">
                    No se pudieron cargar los productos.
                </div>
            </div>
        `;
    }
}

cargarProductos();