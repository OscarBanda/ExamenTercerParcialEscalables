require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notaRoutes = require('./routes/nota.routes');

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notas_rapidas';

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', notaRoutes);

// Conexión a MongoDB y arranque del servidor
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB exitosamente');
    app.listen(PORT, () => {
      console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message);
  });
