document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro de la URL (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const servicioId = urlParams.get('id');

    if (!servicioId) {
        console.error("No se proporcionó un ID de servicio en la URL.");
        return;
    }

    // Llamada AJAX para obtener los requisitos del servicio desde http://localhost:7081/servicios/requisitos/id
    fetch(`http://18.119.236.184:7081/servicios/requisitos/${servicioId}`, {
        headers: {
            "Authorization": "Basic " + btoa("admin:admin")
        }
    })
    .then(response => {
        if (response.status === 404) {
            console.warn("No se encontraron requisitos para el servicio.");
            return [];
        } else if (response.status === 200) {
            return response.json();
        } else {
            window.location.href = "error.html";
        }
    })
    .then(data => {
        const requisitosForm = document.getElementById("requisitosForm");

        // Iterar sobre los requisitos y agregarlos al formulario
        data.forEach(requisito => {
            
            const requisitoElement = document.createElement("div");
            requisitoElement.classList.add("requisito");

            const label = document.createElement("label");
            label.textContent = requisito.nombre.charAt(0).toUpperCase() + requisito.nombre.slice(1);

            let inputElement;

            inputElement = document.createElement("input");
            inputElement.name = requisito.nombre;
            inputElement.type = requisito.tipoInput.toLowerCase();
            
            requisitoElement.appendChild(label);
            requisitoElement.appendChild(inputElement);

            requisitosForm.appendChild(requisitoElement);
        });
    })
    .catch(error => window.location.href = `error.html`);

    const enviarFormularioBtn = document.getElementById("enviarFormulario");
    enviarFormularioBtn.addEventListener("click", function () {
        const formulario = document.getElementById("requisitosForm");

        const formData = {};
        new FormData(formulario).forEach((value, key) => {
            formData[key] = value;
        });
        const jsonData = JSON.stringify(formData);
        // Realizar la llamada AJAX a la URL de validación del cliente
        fetch(`http://3.139.233.231:7082/validacionCliente/${servicioId}`, {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa("admin:admin"),
                "Content-Type": "application/json"
            },
            body: jsonData
        })
        .then(response => {
            if (response.status === 204) {
                window.location.href = "trancisionLogin.html";
            } else if (response.status === 200) {
                return response.json();
            } else {
                window.location.href = "error.html";
            }
        })
        .then(data => {
            if (data) {
                const cedula = data.cedula;
                window.location.href = `verificacionIdentidad.html?cedula=${cedula}`;
            }
        })
        .catch(error =>console.error("Error al procesar la respuesta:", error));
    });
});