const validate = require('./validate.js');
const {
  AddToDo,
  GetToDoList,
  GetToDoById,
  UpdateToDo,
  DeleteToDo,
  GetToken,
} = require('./contoller.js');

const route = [
  {
    method: 'GET',
    path: '/api/v1/get-todolist',
    config: {
      auth: 'jwt',
      ...validate.verifyGetToDoList,
      description: 'Get the todo list',
      tags: ['api'],
    },
    handler: GetToDoList,
  },
  {
    method: 'GET',
    path: '/api/v1/get-todo/{id}',
    config: {
      auth: 'jwt',
      ...validate.verifyGetToDoById,
      description: 'Get the todo by id',
      tags: ['api'],
    },
    handler: GetToDoById,
  },
  {
    method: 'POST',
    path: '/api/v1/add-todo',
    config: {
      auth: 'jwt',
      ...validate.verifyAddToDo,
      description: 'Add a todo to database',
      tags: ['api'],
    },
    handler: AddToDo,
  },
  {
    method: 'PUT',
    path: '/api/v1/update-todo/{id}',
    config: {
      auth: 'jwt',
      ...validate.verifyUpdataToDo,
      description: 'Update a todo in database',
      tags: ['api'],
    },
    handler: UpdateToDo,
  },
  {
    method: 'DELETE',
    path: '/api/v1/delete-todo/{id}',
    config: {
      auth: 'jwt',
      ...validate.verifyGetToDoById,
      description: 'Delete the todo by id',
      tags: ['api'],
    },
    handler: DeleteToDo,
  },
  {
    method: 'POST',
    path: '/api/v1/token',
    config: {
      auth: false,
      ...validate.verifyToken,
      description: 'get token',
      tags: ['api'],
    },
    handler: GetToken,
  },
];

module.exports = {
  route,
};
