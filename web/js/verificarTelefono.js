document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro de la URL (?cedula=)
    const urlParams = new URLSearchParams(window.location.search);
    const cedula = urlParams.get('cedula');

    if (!cedula) {
        console.error("No se proporcionó una cédula en la URL.");
        return;
    }

    const preguntasForm = document.getElementById("preguntasForm");

    preguntasForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar la acción predeterminada del formulario

        const formData = {};
        new FormData(preguntasForm).forEach((value, key) => {
            formData[key] = value;
        });

        formData['cedula'] = cedula;

        const jsonData = JSON.stringify(formData);

        // Realizar la llamada AJAX a la URL de validación del cliente
        fetch(`http://18.217.160.153:7082/validacionCliente/VerificarTelefono?cedula=${cedula}`, {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa("admin:admin"),
                "Content-Type": "application/json"
            },
            body: jsonData
        })
        .then(response => {
            console.log(response.status);
            if (response.status === 200) {
                window.location.href = `registrarNuevoUsuario.html?cedula=${cedula}`;
            }else{
                alert("Error al ingresar datos, intente nuevamente");
            }
        })
        .catch(error => console.error("Error al procesar la respuesta:", error));
    });
});
