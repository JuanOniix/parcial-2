const TaskStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
};

class Task {
  constructor({ id, title, description = '', dueDate = null, status = TaskStatus.PENDING }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = { Task, TaskStatus };