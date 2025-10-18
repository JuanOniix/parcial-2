let tasks = [];
let nextId = 1;

// Crear una nueva tarea
exports.createTask = (req, res) => {
  const { title, description, dueDate } = req.body;

  const newTask = {
    id: nextId++,
    title,
    description,
    dueDate: dueDate || null,
    status: "PENDING",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Obtener todas las tareas
exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

// Obtener una tarea por ID
exports.getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

// Actualizar una tarea por ID
exports.updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, dueDate, status } = req.body;

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (dueDate) task.dueDate = dueDate;
  if (status) task.status = status;

  task.updatedAt = new Date();

  res.json(task);
};

// Eliminar una tarea por ID
exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
};
