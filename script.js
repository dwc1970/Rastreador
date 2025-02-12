const formulario = document.getElementById('formulario');
const botonEnviar = document.getElementById('boton-enviar');
const resultado = document.getElementById('resultado');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const password = document.getElementById('password').value;

    // Validación de campos vacíos
    if (nombre === '' || password === '') {
        mostrarMensaje('error', 'Por favor, complete todos los campos');
        return;
    }

    // Hash de la contraseña (usando bcrypt - REQUIERE INSTALACIÓN EN EL SERVIDOR)
    // Este código es para el cliente (navegador) y NO incluye la función hashPassword
    // La función hashPassword debe estar en el servidor (Node.js) usando bcrypt

    // Obtener geolocalización
    navigator.geolocation.getCurrentPosition(
        function (posicion) {
            const latitud = posicion.coords.latitude;
            const longitud = posicion.coords.longitude;

            // Enviar datos al servidor, incluyendo la geolocalización y la contraseña (sin hashear)
            fetch('http://localhost:3000/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, password, latitud, longitud }) // Incluir latitud y longitud
            })
                .then(respuesta => {
                    if (!respuesta.ok) {
                        throw new Error(`Error en la respuesta: ${respuesta.status}`);
                    }
                    return respuesta.json();
                })
                .then(datos => {
                    if (datos.estado === 'ok') {
                        mostrarMensaje('success', 'Registro exitoso');
                        formulario.reset();
                    } else {
                        mostrarMensaje('error', datos.mensaje || 'Error al registrar');
                    }
                })
                .catch(error => {
                    mostrarMensaje('error', 'Error al enviar datos: ' + error.message);
                });
        },
        function (error) {
            mostrarMensaje('error', 'Error al obtener la geolocalización: ' + error.message);
            // Si quieres evitar el registro si falla la geolocalización, puedes quitar el código de envío.
            fetch('http://localhost:3000/registro', { // Enviar sin geolocalización
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, password }) // Contraseña sin hashear
            })
                .then(respuesta => { // ... (resto del código para manejar la respuesta)
                })
                .catch(error => { // ... (resto del código para manejar errores)
                });
        }
    );
});

function mostrarMensaje(tipo, mensaje) {
    resultado.innerHTML = `<div class="${tipo}">${mensaje}</div>`;
}