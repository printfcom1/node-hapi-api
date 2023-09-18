const Joi = require('@hapi/joi');

const modelTodo = Joi.object({
  _id: Joi.string().required().example('64e6c759513ab47513c655d4'),
  title: Joi.string().required().example('title'),
  descriptions: Joi.string().required().example('descriptions'),
  createdAt: Joi.date().iso().example(new Date('2023-08-24T10:03:08.499Z')),
  updatedAt: Joi.date().iso().example(new Date('2023-08-24T10:03:08.499Z')),
}).label('Model Todo');

const modelTodoInput = Joi.object({
  title: Joi.string().required(),
  descriptions: Joi.string().required(),
}).label('ToDo Input');

const verifyAddToDo = {
  validate: {
    options: {
      allowUnknown: true,
    },
    payload: modelTodoInput,
  },
  response: {
    schema: modelTodo,
    failAction: 'error',
  },
};

const verifyGetToDoList = {
  validate: {
    options: {
      allowUnknown: true,
    },
    query: {
      pageSize: Joi.number().default(10),
      page: Joi.number().default(1),
      keyword: Joi.string().default(''),
    },
  },
  response: {
    schema: Joi.object({
      data: Joi.array().items(modelTodo.optional()).label('Data Aarray'),
      count: Joi.number().required(),
    }).label('Model ToDo List'),
    failAction: 'error',
  },
};

const verifyGetToDoById = {
  validate: {
    options: {
      allowUnknown: true,
    },
    params: Joi.object({
      id: Joi.string().required().example('64e6c759513ab47513c655d4'),
    }),
  },
  response: {
    schema: modelTodo,
    failAction: 'error',
  },
};

const verifyUpdataToDo = {
  validate: {
    options: {
      allowUnknown: true,
    },
    params: Joi.object({
      id: Joi.string().required().example('64e6c759513ab47513c655d4'),
    }),
    payload: modelTodoInput,
  },
  response: {
    schema: modelTodo,
    failAction: 'error',
  },
};

const verifyDeleteToDo = {
  validate: {
    options: {
      allowUnknown: true,
    },
    params: Joi.object({
      id: Joi.string().required().example('64e6c759513ab47513c655d4'),
    }),
  },
  response: {
    schema: modelTodo,
    failAction: 'error',
  },
};

const verifyToken = {
  validate: {
    options: {
      allowUnknown: true,
    },
    payload: Joi.object({
      user: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  response: {
    schema: Joi.object({
      message: Joi.string(),
      token: Joi.string(),
    }),
    failAction: 'error',
  },
};

module.exports = {
  verifyAddToDo,
  verifyGetToDoList,
  verifyGetToDoById,
  verifyUpdataToDo,
  verifyDeleteToDo,
  verifyToken,
};
