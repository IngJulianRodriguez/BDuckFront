document.addEventListener('DOMContentLoaded', function () {
    const serviciosContainer = document.getElementById('servicios-container');

    fetch('http://18.119.236.184:7081/servicios', {
        headers: {
            'Authorization': 'Basic YWRtaW46YWRtaW4='
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(servicio => {
            const servicioElement = document.createElement("div");
            servicioElement.classList.add("servicio");
            servicioElement.innerHTML = `
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
            `;
            servicioElement.addEventListener("click", function () {
                window.location.href = `requisitosServicio.html?id=${servicio.id}`;
            });

            serviciosContainer.appendChild(servicioElement);
        });
    })
    .catch(error => console.error("Error al procesar la respuesta:", error));
});


