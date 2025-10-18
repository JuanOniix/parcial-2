const { Task } = require('../model/task');

class InMemoryTaskRepository {
  constructor() {
    this.store = [];
    this._nextId = 1;
  }

  save(task) {
    if (!task.id) {
      task.id = this._nextId++;
      this.store.push(task);
      return task;
    } else {
      const idx = this.store.findIndex(t => t.id === task.id);
      if (idx === -1) throw new Error('Task not found for update');
      this.store[idx] = task;
      return task;
    }
  }

  findAll(filter = {}) {
    const { status } = filter;
    if (status) {
      return this.store.filter(t => t.status === status);
    }
    return [...this.store];
  }

  findById(id) {
    return this.store.find(t => t.id === id) || null;
  }

  delete(id) {
    const idx = this.store.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.store.splice(idx, 1);
    return true;
  }

  findOverdue(today = new Date()) {
    const now = new Date(today);
    return this.store.filter(t => t.dueDate && t.dueDate < now && t.status !== 'DONE');
  }
}

module.exports = InMemoryTaskRepository;