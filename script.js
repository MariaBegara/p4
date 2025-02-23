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
        const filtrarBtn = document.getElementById("busca-coche");

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
                alert("Por favor, introduce un precio válido.");
                return;
            }

            // Filtrar coches que su precio sea menor o igual que elintroducido por el usuario
            const cochesFiltrados = coches.filter(
                coche => coche.price <= precioMaximo
            );
            mostrarCoches(cochesFiltrados);
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
        const buscarMotosBtn = document.getElementById("buscar-motos");
        const motosContenedor = document.getElementById("motos-contenedor");

        buscarBicisBtn.addEventListener("click", function () {
            bicisContenedor.innerHTML = `<p>Esta función se implementará próximamente.</p>`
        });

        buscarTrenesBtn.addEventListener("click", function () {
            trenesContenedor.innerHTML = `<p>Esta función se implementará próximamente.</p>`
        });

        buscarMotosBtn.addEventListener("click", function () {
            motosContenedor.innerHTML = `<p>Esta función se implementará próximamente.</p>`
        });
    });

    
    

    