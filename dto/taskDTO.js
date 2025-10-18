const { BadRequestError } = require('../utils/errors');

function createTaskDTO(payload) {
  if (!payload || !payload.title || typeof payload.title !== 'string') {
    throw new BadRequestError('title is required and must be a string');
  }
  const dto = {
    title: payload.title.trim(),
    description: payload.description ? String(payload.description).trim() : '',
    dueDate: payload.dueDate ? new Date(payload.dueDate) : null
  };
  if (dto.dueDate && isNaN(dto.dueDate.getTime())) {
    throw new BadRequestError('dueDate must be a valid date');
  }
  return dto;
}

function updateStatusDTO(payload) {
  if (!payload || !payload.status) throw new BadRequestError('status is required');
  const status = String(payload.status).toUpperCase();
  return { status };
}

module.exports = { createTaskDTO, updateStatusDTO };