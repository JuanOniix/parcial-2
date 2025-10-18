const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const { NotFoundError, BadRequestError } = require('./utils/errors');

const app = express();
app.use(express.json());

console.log("✅ Cargando rutas de tareas...");
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => res.send({ status: 'ok' }));

// 🧱 Manejo de errores
app.use((err, req, res, next) => {
  if (err instanceof BadRequestError) {
    return res.status(400).json({ error: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
