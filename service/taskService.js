const { Task, TaskStatus } = require('../model/task');
const InMemoryTaskRepository = require('../repository/inMemoryTaskRepository');
const { createTaskDTO, updateStatusDTO } = require('../dto/taskDTO');
const { NotFoundError, BadRequestError } = require('../utils/errors');

class TaskService {
  constructor(taskRepository) {
    this.repo = taskRepository || new InMemoryTaskRepository();
  }

  create(payload) {
    const dto = createTaskDTO(payload);
    const task = new Task({
      id: null,
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate,
      status: TaskStatus.PENDING
    });
    return this.repo.save(task);
  }

  list(filter = {}) {
    if (filter.status) {
      const status = String(filter.status).toUpperCase();
      if (!Object.values(TaskStatus).includes(status)) {
        throw new BadRequestError('Invalid status filter');
      }
      return this.repo.findAll({ status });
    }
    return this.repo.findAll();
  }

  updateStatus(id, payload) {
    const dto = updateStatusDTO(payload);
    const status = dto.status;
    if (!Object.values(TaskStatus).includes(status)) {
      throw new BadRequestError('Invalid status value');
    }
    const numericId = Number(id);
    const existing = this.repo.findById(numericId);
    if (!existing) throw new NotFoundError(`Task ${id} not found`);
    existing.status = status;
    existing.updatedAt = new Date();
    return this.repo.save(existing);
  }

  delete(id) {
    const numericId = Number(id);
    const ok = this.repo.delete(numericId);
    if (!ok) throw new NotFoundError(`Task ${id} not found`);
    return true;
  }

  findOverdue(today = new Date()) {
    return this.repo.findOverdue(today);
  }

  findById(id) {
    const numericId = Number(id);
    const task = this.repo.findById(numericId);
    if (!task) throw new NotFoundError(`Task ${id} not found`);
    return task;
  }
}

module.exports = TaskService;