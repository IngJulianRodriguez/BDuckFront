document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro de la URL (?cedula=)
    const urlParams = new URLSearchParams(window.location.search);
    const cedula = urlParams.get('cedula');

    if (!cedula) {
        console.error("No se proporcionó una cédula en la URL.");
        return;
    }

    const nuevoClienteForm = document.getElementById("nuevoClienteForm");

    nuevoClienteForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar la acción predeterminada del formulario

        const formData = {};
        new FormData(nuevoClienteForm).forEach((value, key) => {
            formData[key] = value;
        });

        formData['cedula'] = cedula; // Agregar la cédula al formulario

        const jsonData = JSON.stringify(formData);

        // Realizar la llamada AJAX a la URL de validación del cliente
        fetch(`http://3.142.147.37:7085/administrarCliente`, {
            method: "PUT",
            headers: {
                "Authorization": "Basic " + btoa("admin:admin"),
                "Content-Type": "application/json"
            },
            body: jsonData
        })
        .then(response => {
            console.log(response.status);
            if (response.status === 200) {
                window.location.href = "mainPage.html";
            }else{
                alert("Codigo no coincide, intente nuevamente");
            }
        })
        .catch(error => console.error("Error al procesar la respuesta:", error));
    });
});
