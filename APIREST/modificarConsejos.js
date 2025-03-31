document.addEventListener("DOMContentLoaded", function () {
    const inputTituloModificar = document.getElementById("titulo-modificar");
    const inputUsuarioModificar = document.getElementById("usuario-modificar");
    const inputMensajeModificar = document.getElementById("mensaje-modificar");
    const btnModificar = document.getElementById("modificar-consejo");
    const btnEliminar = document.getElementById("eliminar-consejo");
    const URL = "http://localhost:8080/api/consejos";

    // PUT: modificar un consejo existente
    // DELETE: eliminar un consejo existente
    const titulo = inputTituloModificar.value;
    const usuario = inputUsuarioModificar.value;
    const nuevoMensaje = inputMensajeModificar.value;

    async function modificarConsejo() {


        try {
            const respuesta = await fetch(`${URL}/titulo/${titulo}/usuario/${usuario}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mensaje: nuevoMensaje })
            });

            if (respuesta.ok) {
                alert("Consejo modificado correctamente.");
                inputTituloModificar.value = "";
                inputUsuarioModificar.value = "";
                inputMensajeModificar.value = "";
            } else {
                alert("No se encontró el usuario.");
            }
        } catch (error) {
            console.error("Error al modificar consejo:", error);
        }
    }


    
    async function eliminarConsejo() {
        
        try {
            const respuesta = await fetch(`${URL}/titulo/${titulo}/usuario/${usuario}`, {
                method: "DELETE"
            });

            if (respuesta.ok) {
                alert("Consejo eliminado correctamente.");
                inputTituloModificar.value = "";
                inputUsuarioModificar.value = "";
                inputMensajeModificar.value = "";
            } else {
                alert("No se encontró el usuario.");
            }
        } catch (error) {
            console.error("Error al eliminar consejo:", error);
        }
    }

    btnModificar.addEventListener("click", modificarConsejo);
    btnEliminar.addEventListener("click", () => eliminarConsejo());
});
