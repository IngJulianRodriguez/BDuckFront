document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro de la URL (?cedula=)
    

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar la acción predeterminada del formulario

        const formData = {};
        new FormData(loginForm).forEach((value, key) => {
            formData[key] = value;
        });

        const jsonData = JSON.stringify(formData);

        // Realizar la llamada AJAX a la URL de validación del cliente
        fetch(`http://localhost:7085/administrarCliente/login`, {
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
                window.location.href = "mainPage.html";
            }else{
                alert("Error de credenciales, intente nuevamente");
            }
        })
        .catch(error => window.location.href = "error.html");
    });
});
