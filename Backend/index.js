console.log('hola mundo')

// Importar Express
const express = require('express');
const cors = require('cors');
// Inicializar la aplicación Express
const app = express();
app.use(cors());
// Definir el puerto para el servidor
const PORT = 8080;

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola Mundo con Node.js y Express!');
});

app.get('/ping', (req, res) => {
    res.status(200).json(
      {
        message:'pong'
      }
    )
  });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});