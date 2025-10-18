const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

// Rutas de tareas
router.get('/', taskController.getAllTasks);        // Obtener todas las tareas
router.post('/', taskController.createTask);        // Crear una tarea
router.get('/:id', taskController.getTaskById);     // Obtener tarea por ID
router.put('/:id', taskController.updateTask);      // Actualizar tarea
router.delete('/:id', taskController.deleteTask);   // Eliminar tarea

module.exports = router;
