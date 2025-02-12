const express = require('express');
const bcrypt = require('bcrypt'); // Importa bcrypt
const app = express();
const port = 3000;

app.use(express.json());

// ... (Código de conexión a la base de datos)

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});