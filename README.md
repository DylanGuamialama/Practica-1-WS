# Practica-1-WS

## Descripción del proyecto

Esta práctica consiste en desarrollar un **Web Service** con **Node.js** y **Express** para gestionar libros en una biblioteca (CRUD básico). Además, se incluye la contenedorización con **Docker** y se documenta todo el proceso.

Se implementan los siguientes endpoints RESTful:

1. `GET /libros`  
   - Devuelve todos los libros en formato JSON.

2. `GET /libros/:id`  
   - Devuelve un libro específico por su ID.  
   - Si no existe, responde con HTTP 404 y `{ "mensaje": "Libro no encontrado" }`.

3. `POST /libros`  
   - Crea un nuevo libro.  
   - Valida que el body tenga **titulo** y **autor**. Si falta alguno, devuelve HTTP 400 con `{ "mensaje": "Tanto el título como el autor son obligatorios" }`.  
   - Si se crea correctamente, devuelve HTTP 201 con el objeto `{ id, titulo, autor }`.

4. `PUT /libros/:id`  
   - Actualiza un libro existente por ID.  
   - Si el ID no existe, devuelve HTTP 404 con `{ "mensaje": "Libro no encontrado" }`.  
   - Valida que en el body vengan **titulo** y **autor**. Si falta alguno, devuelve HTTP 400 con `{ "mensaje": "Tanto el título como el autor son obligatorios para actualizar" }`.  
   - Si se actualiza correctamente, devuelve HTTP 200 con el objeto actualizado `{ id, titulo, autor }`.

5. `DELETE /libros/:id`  
   - Elimina un libro por ID.  
   - Si no existe, devuelve HTTP 404 con `{ "mensaje": "No se ha encontrado el libro" }`.  
   - Si se elimina correctamente, devuelve HTTP 200 con `{ "mensaje": "Libro eliminado", "libro": { … } }`.

6. `GET /libros?autor=<nombre>`  
   - Filtra libros por autor (query string).  
   - Si se incluye `?autor=…`, devuelve todos los libros cuyo campo `autor` contenga (parcial, case-insensitive) el valor pasado.  
   - Si no hay coincidencias, responde con HTTP 404 y `{ "mensaje": "No se encontraron libros de ese autor" }`.  
   - Si no se incluye la query `autor`, equivale a `GET /libros` (devuelve todos).



## Comandos básicos
- `npm` – gestor de paquetes de Node.js  
- `npm init` – crea un nuevo proyecto de Node (genera `package.json`)  
- `Crear index.js` – archivo principal de la aplicación  
- `node index.js` – ejecuta el proyecto de Node  
- `npm i express` – instala el framework Express  


## Comandos Docker usados

Estos son los comandos que se utilizaron en la instancia de Ubuntu para instalar Docker, construir la imagen y ejecutar el contenedor:

1. **Instalar dependencias necesarias para Docker**  
   
   sudo apt install apt-transport-https ca-certificates curl software-properties-common

2. **Agregar la clave GPG oficial de Docker**

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

3. **Agregar el repositorio de Docker para Ubuntu Focal**

    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

4. **Verificar la versión disponible de Docker CE**

    apt-cache policy docker-ce

5. **Instalar Docker Community Edition**

    sudo apt install docker-ce

6. **Comprobar el estado del servicio Docker**

    sudo systemctl status docker

7. **Construir la imagen Docker**

    sudo docker build -t node-hello .

8. **Ejecutar el contenedor en segundo plano**

    sudo docker run -d -p 8080:8080 --name hello --restart on-failure node-hello:latest
