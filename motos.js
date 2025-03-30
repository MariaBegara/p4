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
            moto => moto.price /300 <= precioMaximo
        );
        mostrarMotos(motosFiltradas);
    });
});