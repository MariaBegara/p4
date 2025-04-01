document.addEventListener("DOMContentLoaded", function () {
    const contenedorConsejos = document.getElementById("consejos-contenedor");
    const botonActualizar = document.getElementById("actualizar-consejos");
    
    const URL = "http://localhost:8080/api/consejos";

    // GET: obtener 4 consejos aleatorios
    fetch(URL) // URL de la API
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(data => {
            obtenerConsejos(data);
        })
        .catch(error => console.error("Error al obtener los datos:", error));

    function obtenerConsejos(consejos) {
        
        // Se eliminan los consejos anteriores
        contenedorConsejos.innerHTML = "";

        consejos.forEach(consejo => {
            const consejoHTML = `
                <div class="consejo" data-titulo="${consejo.titulo}" data-usuario="${consejo.usuario}">
                    <h3>${consejo.titulo}</h3> 
                    <p>${consejo.mensaje}</p>
                </div>
            `;
            contenedorConsejos.innerHTML += consejoHTML;
        });
    }

    // Actualizar los consejos cuando se haga clic en el botón
    botonActualizar.addEventListener("click", obtenerConsejos);
});