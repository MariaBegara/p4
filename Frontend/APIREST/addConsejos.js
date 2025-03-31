document.addEventListener("DOMContentLoaded", function () {
    const inputUsuario = document.getElementById("usuario-consejo");
    const inputMensaje = document.getElementById("mensaje-consejo");
    const inputTitulo = document.getElementById("titulo-consejo");
    const btnEnviar = document.getElementById("enviar");
    const URL = "http://localhost:8080/api/consejos";

    // POST: añadir un nuevo consejo
    async function addConsejo() {
        
        const nuevoConsejo = {
            titulo: inputTitulo.value,
            usuario: inputUsuario.value,
            mensaje: inputMensaje.value
        };

        try {
            const respuesta = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoConsejo)
            });

            if (respuesta.ok) {
                alert("Consejo añadido correctamente.");
                inputTitulo.value = "";
                inputUsuario.value = "";
                inputMensaje.value = "";
            } else {
                alert("Error al enviar el consejo.");
            }
        } catch (error) {
            console.error("Error al enviar consejo:", error);
        }
    }

    btnEnviar.addEventListener("click", addConsejo);
});
