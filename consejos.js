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