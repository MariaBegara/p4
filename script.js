   
    document.addEventListener("DOMContentLoaded", function () {
        const contenedorConsejos = document.getElementById("consejos-contenedor");
        const botonActualizar = document.getElementById("actualizar-consejos");
    
        async function obtenerConsejos() {
            try {
                // Llamada para obtener consejos aleatorios
                const respuesta = await fetch("https://dummyjson.com/posts?limit=5&skip=" + Math.floor(Math.random() * 100));
                const datos = await respuesta.json();
    
                // Se eliminan los consejos anteriores
                contenedorConsejos.innerHTML = "";
    
                // Recorrer los consejos y añadirlos al contenedor
                datos.posts.forEach(post => {
                    const consejoHTML = `
                        <div class="consejo">
                            <h3>${post.title}</h3>
                            <p>${post.body}</p>
                        </div>
                    `;
                    contenedorConsejos.innerHTML += consejoHTML;
                });
            } catch (error) {
                console.error("Error al obtener consejos:", error);
                contenedorConsejos.innerHTML = "<p>No se pudieron cargar los consejos.</p>";
            }
        }
    
        // Llamar a la función
        obtenerConsejos();
    
        // Actualizar los consejos cuando se haga clic en el botón
        botonActualizar.addEventListener("click", obtenerConsejos);
    });



    // DUMMYJSON -> anuncios de alquiler de coches
    document.addEventListener("DOMContentLoaded", function () {
        const contenedorCoches = document.getElementById("coches-contenedor");
        const precioInput = document.getElementById("precio-coche");
        const filtrarBtn = document.getElementById("buscar-coche");
        const errorPrecio = document.getElementById("error-precio-coche");

        let coches = [];

        // Se realiza la petición HTTP GET al servidor - categoría vehículos
        fetch("https://dummyjson.com/products/category/vehicle?limit=3") // URL de la API
            .then(response => response.json()) // Convertimos la respuesta a JSON
            .then(data => {
                coches = data.products; // Guardamos los productos obtenidos
                mostrarCoches(coches);
            })
            .catch(error => console.error("Error al obtener los datos:", error));

        // Función para actualizar los coches
        function mostrarCoches(lista) {
            contenedorCoches.innerHTML = "";
            if (lista.length === 0) {
                contenedorCoches.innerHTML = "<p>No hay coches en este rango de precio.</p>";
                return;
            }
            lista.forEach(coche => {
                // Crear un div para cada coche
                const cocheElemento = document.createElement("div");
                cocheElemento.classList.add("coche");

                // Insertar los datos en el HTML 
                cocheElemento.innerHTML = `
                    <img src="${coche.thumbnail}" alt="${coche.title}">
                    <h3 id="title">${coche.title}</h3>
                    <p id="description">${coche.description}</p>
                    <p id="price" class="precio">Precio: ${(coche.price /500).toFixed(2)}€</p>
                `;

                // Añadir el elemento al contenedor
                contenedorCoches.appendChild(cocheElemento);
            });
        }

        // Evento para filtrar por precio
        filtrarBtn.addEventListener("click", function () {
            const precioMaximo = parseFloat(precioInput.value); // Obtener el valor del input
            if (isNaN(precioMaximo) || precioMaximo <= 0) {
                errorPrecio.textContent = "Por favor, introduce un precio válido.";
                errorPrecio.style.display = "block"; // Muestra el mensaje de error
                return;
            } else {
                errorPrecio.style.display = "none"; // Oculta el mensaje de error si el input es válido
            }

            // Filtrar coches que su precio sea menor o igual que elintroducido por el usuario
            const cochesFiltrados = coches.filter(
                coche => coche.price <= precioMaximo
            );
            mostrarCoches(cochesFiltrados);
        });
    });



    // DUMMYJSON -> anuncios de alquiler de motos
    document.addEventListener("DOMContentLoaded", function () {
        const contenedorMotos = document.getElementById("motos-contenedor");
        const precioInput = document.getElementById("precio-moto");
        const filtrarBtn = document.getElementById("buscar-moto");
        const errorPrecio = document.getElementById("error-precio-moto");

        let motos = [];

        // Se realiza la petición HTTP GET al servidor - categoría vehículos
        fetch("https://dummyjson.com/products/category/motorcycle?limit=3") // URL de la API
            .then(response => response.json()) // Convertimos la respuesta a JSON
            .then(data => {
                motos = data.products; // Guardamos los productos obtenidos
                mostrarMotos(motos);
            })
            .catch(error => console.error("Error al obtener los datos:", error));

        // Función para actualizar las motos
        function mostrarMotos(lista) {
            contenedorMotos.innerHTML = "";
            if (lista.length === 0) {
                contenedorMotos.innerHTML = "<p>No hay motos en este rango de precio.</p>";
                return;
            }
            lista.forEach(moto => {
                // Crear un div para cada moto
                const motoElemento = document.createElement("div");
                motoElemento.classList.add("moto");

                // Insertar los datos en el HTML 
                motoElemento.innerHTML = `
                    <img src="${moto.thumbnail}" alt="${moto.title}">
                    <h3 id="title">${moto.title}</h3>
                    <p id="description">${moto.description}</p>
                    <p id="price" class="precio">Precio: ${(moto.price /300).toFixed(2)}€</p>
                `;

                // Añadir el elemento al contenedor
                contenedorMotos.appendChild(motoElemento);
            });
        }

        // Evento para filtrar por precio
        filtrarBtn.addEventListener("click", function () {
            const precioMaximo = parseFloat(precioInput.value); // Obtener el valor del input
            if (isNaN(precioMaximo) || precioMaximo <= 0) {
                errorPrecio.textContent = "Por favor, introduce un precio válido.";
                errorPrecio.style.display = "block"; // Muestra el mensaje de error
                return;
            } else {
                errorPrecio.style.display = "none"; // Oculta el mensaje de error si el input es válido
            }

            // Filtrar motos que su precio sea menor o igual que elintroducido por el usuario
            const motosFiltradas = motos.filter(
                moto => moto.price <= precioMaximo
            );
            mostrarMotos(motosFiltradas);
        });
    });
  
    
    


    // API de bicis - https://api.citybik.es/v2/ -> siguiente implementación
    // API de trenes - https://docs.irail.be/ -> siguiente implementación
    document.addEventListener("DOMContentLoaded", function () {
         // Mensaje para la búsqueda de bicicletas
        const buscarBicisBtn = document.getElementById("buscar-bici");
        const bicisContenedor = document.getElementById("bicis-contenedor");
        const buscarTrenesBtn = document.getElementById("buscar-trenes");
        const trenesContenedor = document.getElementById("trenes-contenedor");

        buscarBicisBtn.addEventListener("click", function () {
            bicisContenedor.innerHTML = `<p>Esta función se implementará próximamente.</p>`
        });

        buscarTrenesBtn.addEventListener("click", function () {
            trenesContenedor.innerHTML = `<p>Esta función se implementará próximamente.</p>`
        });

    });

    
    

    