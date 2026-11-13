const Nota = require('../models/Nota');

// Obtener todas las notas (GET)
const obtenerNotas = async (req, res) => {
  try {
    const notas = await Nota.find();
    res.status(200).json(notas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las notas', error: error.message });
  }
};

// Crear una nueva nota (POST)
const crearNota = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;
    const nuevaNota = new Nota({ titulo, contenido });
    const notaGuardada = await nuevaNota.save();
    res.status(201).json(notaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear la nota', error: error.message });
  }
};

module.exports = {
  obtenerNotas,
  crearNota
};
