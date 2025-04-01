document.addEventListener("DOMContentLoaded", function () {
    const inputUsuario = document.getElementById("usuario-consejo");
    const inputMensaje = document.getElementById("mensaje-consejo");
    const inputTitulo = document.getElementById("titulo-consejo");
    const btnEnviar = document.getElementById("enviar-consejo");
    const URL = "http://localhost:8080/api/consejos";

    // POST: añadir un nuevo consejo
    function addConsejo() {
        
        const nuevoConsejo = {
            titulo: inputTitulo.value.trim(),
            usuario: inputUsuario.value.trim(),
            mensaje: inputMensaje.value.trim()
        };

        if (!nuevoConsejo.titulo || !nuevoConsejo.usuario || !nuevoConsejo.mensaje) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoConsejo)
        })
        .then(response =>  response.json())
        .then(() => {

            alert("Consejo añadido correctamente.");
            // Se limpian los inputs
            inputTitulo.value = "";
            inputUsuario.value = "";
            inputMensaje.value = "";
        })

        .catch(error => console.error("Error al enviar consejo:", error));
    
    }

    btnEnviar.addEventListener("click", addConsejo);
});
