document.addEventListener("DOMContentLoaded", function () {
    const inputTituloModificar = document.getElementById("titulo-modificar");
    const inputUsuarioModificar = document.getElementById("usuario-modificar");
    const inputMensajeModificar = document.getElementById("mensaje-modificar");
    const btnModificar = document.getElementById("modificar-consejo");
    const btnEliminar = document.getElementById("eliminar-consejo");
    const URL = "http://localhost:8080/api/consejos";

    // PUT: Modificar un consejo existente
    function modificarConsejo() {
        const titulo = inputTituloModificar.value.trim();
        const usuario = inputUsuarioModificar.value.trim();
        const nuevoMensaje = inputMensajeModificar.value.trim();

        if (!titulo || !usuario || !nuevoMensaje) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        fetch(`${URL}/titulo/${titulo}/usuario/${usuario}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensaje: nuevoMensaje })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("No se encontró el usuario o hubo un error en la modificación.");
            }
            return response.json();
        })
        .then(() => {
            alert("Consejo modificado correctamente.");
            limpiarCampos();
        })
        .catch(error => console.error("Error al modificar consejo:", error));
    }


    // DELETE: Eliminar un consejo existente
    function eliminarConsejo() {
        const titulo = inputTituloModificar.value.trim();
        const usuario = inputUsuarioModificar.value.trim();

        if (!titulo || !usuario) {
            alert("Debes ingresar un título y un usuario para eliminar.");
            return;
        }

        fetch(`${URL}/titulo/${titulo}/usuario/${usuario}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("No se encontró el usuario o el consejo.");
            }
            return response.text();
        })
        .then(() => {
            alert("Consejo eliminado correctamente.");
            inputTituloModificar.value = "";
            inputUsuarioModificar.value = "";
            inputMensajeModificar.value = "";
        })
        .catch(error => console.error("Error al eliminar consejo:", error));
    }



    btnModificar.addEventListener("click", modificarConsejo);
    btnEliminar.addEventListener("click", eliminarConsejo);
});
