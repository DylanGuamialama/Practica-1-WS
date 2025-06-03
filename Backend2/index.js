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
  { id: 1, titulo: "Herramientas", autor: "Carlos" },
  { id: 2, titulo: "Base de datos", autor: "Daniel" },
  { id: 3, titulo: "Programacion web", autor: "Jose" },
];

// Ruta GET para todos los libros
app.get('/libros', (req, res) => {
  res.json(libros);
});

// Ruta GET para un libro por id
app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id === id);
  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ mensaje: "Libro no encontrado" });
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


// Ruta GET para un libro por autor
app.get('/libros/autor/:autor', (req, res) => {
  const autorBuscado = req.params.autor.toLowerCase();
  // Filtrar los libros cuyo campo `autor` coincida 
  const resultados = libros.filter(l =>
    l.autor.toLowerCase().includes(autorBuscado)
  );
  if (resultados.length > 0) {
    res.json(resultados);
  } else {
    res.status(404).json({ mensaje: "No se encontraron libros de ese autor" });
  }
});


// Crear nuevo libro
app.post('/libros', (req, res) => {
  const { titulo, autor } = req.body;
  if (!titulo || !autor) {
    return res.status(400).json({ mensaje: "Tanto el título como el autor son obligatorios" });
  }
  const nuevoLibro = {
    id: libros.length ? libros[libros.length - 1].id + 1 : 1,
    titulo,
    autor
  };
libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});


// Actualizar un libro
app.put('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, autor } = req.body;
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }
  if (!titulo || !autor) {
    return res.status(400).json({ mensaje: "Tanto el título como el autor son obligatorios para actualizar" });
  }
  libros[index] = { id, titulo, autor };
  res.json(libros[index]);
});


// Eliminar un libro
app.delete('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({ mensaje: "No se ha encontrado el libro" });
  }
  const eliminado = libros.splice(index, 1)[0];
  res.json({ mensaje: "Libro eliminado", libro: eliminado });
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
