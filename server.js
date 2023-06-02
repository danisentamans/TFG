const express = require('express');
const app = express();

// Configurar la ruta para los archivos estáticos
app.use(express.static('/dist'));

// Configurar el tipo MIME para los archivos JavaScript
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Resto de la configuración del servidor

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor Express iniciado en el puerto 3000');
});
