document.addEventListener('DOMContentLoaded', function () {
    const serviciosContainer = document.getElementById('servicios-container');

    // Llamada al endpoint para obtener la lista de servicios
    fetch('http://localhost:7081/servicios', {
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
            // Agregar evento clic para redirigir a requisitosServicio.html
            servicioElement.addEventListener("click", function () {
                window.location.href = `requisitosServicio.html?id=${servicio.id}`;
            });

            serviciosContainer.appendChild(servicioElement);
        });
    })
    .catch(error => window.location.href = "error.html");
});

function afiliarse(idServicio) {
    // Lógica para afiliarse al servicio con el id proporcionado
    // Puedes implementar esta función según tus necesidades
    console.log('Afiliarse al servicio con id:', idServicio);
    alert('Afiliación exitosa. ¡Bienvenido!');
}
