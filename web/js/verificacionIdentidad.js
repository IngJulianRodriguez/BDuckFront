document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro de la URL (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const cedula = urlParams.get('cedula');

    if (!cedula) {
        console.error("No se proporcionó una cedula en la URL.");
        return;
    }

    fetch(`http://3.143.244.90:7084/confirmarIdentidad/obtenerPreguntas/${cedula}`, {
        headers: {
            "Authorization": "Basic " + btoa("admin:admin")
        }
    })
    .then(response => {
        if (response.status === 404) {
            console.warn("No se encontraron preguntas para el usuario.");
            return [];
        } else if (response.status === 200) {
            return response.json();
        } else {
            throw new Error(`Error al obtener las preguntas: ${response.statusText}`);
        }
    })
    .then(data => {
        const preguntasForm = document.getElementById("preguntasForm");

       let n = 1;
        data.forEach(pregunta => {
            const label = document.createElement("label");
            label.textContent = pregunta;

            let nombre = "pregunta"+n;
            const preguntaDiv = document.createElement('div');
            preguntaDiv.classList.add('pregunta');
            preguntaDiv.innerHTML = `
                <input type="radio" id="Si" name="${nombre}" value="Si" checked />
                    <label for="Si">Si</label>
                </div>
                <input type="radio" id="No" name="${nombre}" value="No"/>
                    <label for="No">No</label>
                </div>
                <input type="radio" id="N" name="${nombre}" value="N" />
                    <label for="N">No estoy seguro</label>
                </div>
                
            `;
            n++;
            preguntasForm.appendChild(label);
            preguntasForm.appendChild(preguntaDiv);
        });
    })
    .catch(error => window.location.href = `error.html`);

    const enviarFormularioBtn = document.getElementById("enviarFormulario");
    enviarFormularioBtn.addEventListener("click", function () {
        const formulario = document.getElementById("preguntasForm");

        const formData = {};
        new FormData(formulario).forEach((value, key) => {
            formData[key] = value;
        });
        const jsonData = JSON.stringify(formData);
        // Realizar la llamada AJAX a la URL de validación del cliente
        fetch(`http://3.143.244.90:7084/confirmarIdentidad/${cedula}`, {
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
                window.location.href = `verificarTelefono.html?cedula=${cedula}`;
            }else{
                window.location.href = `error.html`;
            }
        })
        .then(data => {
           
        })
        .catch(error => console.error("Error al procesar la respuesta:", error));
    });
});