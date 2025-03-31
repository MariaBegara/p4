document.addEventListener("DOMContentLoaded", function () {
    const contenedorConsejos = document.getElementById("consejos-contenedor");
    const botonActualizar = document.getElementById("actualizar-consejos");
    
    const URL = "http://localhost:8080/api/consejos";

    // GET: obtener 4 consejos aleatorios
    async function obtenerConsejos() {
        try {
            const respuesta = await fetch(URL);

            // Verificar fallo en la respuesta
            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            }

            // Convertir la respuesta a JSON
            const consejos = await respuesta.json();

            // Se eliminan los consejos anteriores
            contenedorConsejos.innerHTML = "";

            consejos.forEach(consejo => {
                const consejoHTML = `
                    <div class="consejo" data-titulo="${consejo.titulo}" data-usuario="${consejo.usuario}">
                        <h3>${consejo.titulo} (@${consejo.titulo})</h3>
                        <p>${consejo.mensaje}</p>
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