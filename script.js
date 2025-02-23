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
    
    


    // DUMMYJSON -> anuncios (simulando que son empresas de alquiler de bicicletas)
    document.addEventListener("DOMContentLoaded", function () {
        const contenedorBicis = document.getElementById("bicis-contenedor");
        const precioInput = document.getElementById("precio-max");
        const filtrarBtn = document.getElementById("buscar-precio");
    
        let bicicletas = [];
    
        // Se realiza la petición HTTP GET al servidor
        fetch("https://dummyjson.com/products?limit=10") // URL de la API
            .then(response => response.json()) // Convertimos la respuesta a JSON
            .then(data => {
                bicicletas = data.products; // Guardamos los productos obtenidos
                mostrarBicis(bicicletas);
            })
            .catch(error => console.error("Error al obtener los datos:", error));
    
        // Función para actualizar la interfaz con las bicicletas obtenidas
        function mostrarBicis(lista) {
            contenedorBicis.innerHTML = "";
            if (lista.length === 0) {
                contenedorBicis.innerHTML = "<p>No hay bicicletas en este rango de precio.</p>";
                return;
            }
            lista.forEach(bici => {
                // Crear un div para cada bicicleta
                const biciElemento = document.createElement("div");
                biciElemento.classList.add("bici");
    
                // Insertar los datos en el HTML
                biciElemento.innerHTML = `
                    <img src="${bici.thumbnail}" alt="${bici.title}">
                    <h3 id="title">${bici.title}</h3>
                    <p id="description">${bici.description}</p>
                    <p id="price" class="precio">Precio: ${bici.price}€</p>
                `;
    
                // Añadir el elemento al contenedor
                contenedorBicis.appendChild(biciElemento);
            });
        }
    
        // Evento para filtrar por precio
        filtrarBtn.addEventListener("click", function () {
            const precioMaximo = parseFloat(precioInput.value); // Obtener el valor del input
            if (isNaN(precioMaximo) || precioMaximo <= 0) {
                alert("Por favor, introduce un precio válido.");
                return;
            }
    
            // Filtrar bicicletas cuyo precio sea menor o igual que el que ha metdo el usuario
            const bicisFiltradas = bicicletas.filter(
                bici => bici.price <= precioMaximo
            );
            mostrarBicis(bicisFiltradas);
        });
    });


    // API de trenes - https://docs.irail.be/ -> siguiente implementación
    document.addEventListener("DOMContentLoaded", function () {
        const buscarTrenesBtn = document.getElementById("buscar-trenes");
        const trenesContenedor = document.getElementById("trenes-contenedor"); // Asegúrate de que este ID exista en tu HTML

        buscarTrenesBtn.addEventListener("click", function () {
            trenesContenedor.innerHTML = `<p>Esta función se implementará próximamente.</p>`; 
        });
    });

    