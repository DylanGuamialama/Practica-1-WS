// Importar Express
const express = require('express');

// Inicializar la aplicación Express
const app = express();

// Definir el puerto para el servidor
const PORT = 8080;

// Middleware para parsear JSON y URL‑encoded bodies
app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));   

// Datos de ejemplo
const libros = [
  { id: 1, titulo: "adc", autor: "andres" },
  { id: 2, titulo: "cgfs", autor: "Jose" },
  { id: 3, titulo: "sfdsd", autor: "Guamy" },
];

// Ruta GET para todos los libros
app.get('/libros', (req, res) => {
  res.json(libros);
});

// Ruta GET para un libro por id
app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const libro = libros.find(libro => libro.id === id);
  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ error: 'Libro no encontrado' });
  }
});

// Ruta POST para un libro por id (mismo comportamiento que GET, pero usando POST)
app.post('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const libro = libros.find(libro => libro.id === id);
  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ error: 'Libro no encontrado' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
