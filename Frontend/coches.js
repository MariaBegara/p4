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
            coche => (coche.price)/500 <= precioMaximo
        );
        mostrarCoches(cochesFiltrados);
    });
});