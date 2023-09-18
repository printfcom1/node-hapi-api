const { ToDo } = require('../DB/schema.js');
const Boom = require('@hapi/boom');
const JWT = require('jsonwebtoken');

const GetToken = async (request, h) => {
  const { user, password } = request.payload;
  let message, token;
  if (user && password) {
    message = 'token generate success';
    token = JWT.sign({ user, password }, process.env.SECRET, {
      expiresIn: '1h',
    });
  } else {
    message = 'token generate fail';
    token = '';
  }
  return {
    message: message,
    token: token,
  };
};

const AddToDo = async (request, h) => {
  const { title, descriptions } = request.payload;
  try {
    const newToDo = new ToDo({
      title: title,
      descriptions: descriptions,
    });
    await newToDo.save();

    const result = {
      ...newToDo.toObject(),
      _id: newToDo._id.toHexString(),
    };

    return result;
  } catch (error) {
    return Boom.notFound(`Resource not found : ${error.message}`);
  }
};

const GetToDoList = async (request, h) => {
  const { pageSize, page, keyword } = request.query;
  const skip = (page - 1) * pageSize;
  try {
    const query = {
      $or: [
        { title: { $regex: `^${keyword}`, $options: 'i' } },
        { descriptions: { $regex: `^${keyword}`, $options: 'i' } },
      ],
    };
    const countToDo = await ToDo.count(query);
    const todo = await ToDo.find(query).skip(skip).limit(pageSize).exec();
    if (todo.length !== 0) {
      const result = todo.map((data) => {
        return {
          ...data.toObject(),
          _id: data._id.toHexString(),
        };
      });
      return { data: result, count: countToDo };
    } else {
      return { data: todo, count: countToDo };
    }
  } catch (error) {
    return Boom.notFound(`Resource not found : ${error.message}`);
  }
};

const GetToDoById = async (request, h) => {
  const { id } = request.params;
  try {
    const todo = await ToDo.findOne({ _id: id });
    if (todo) {
      const result = {
        ...todo.toObject(),
        _id: todo._id.toHexString(),
      };
      return result;
    } else {
      return h.response({ message: `Can't find todo id: ${id}` }).code(400);
    }
  } catch (error) {
    return Boom.notFound(`Resource not found : ${error.message}`);
  }
};

const UpdateToDo = async (request, h) => {
  const { id } = request.params;
  const { title, descriptions } = request.payload;
  try {
    const todo = await ToDo.findOneAndUpdate(
      { _id: id },
      { title: title, descriptions: descriptions },
      {
        new: true,
      }
    );
    if (todo) {
      const result = {
        ...todo.toObject(),
        _id: todo._id.toHexString(),
      };
      return result;
    } else {
      return h.response({ message: `Can't find todo id: ${id}` }).code(400);
    }
  } catch (error) {
    return Boom.notFound(`Resource not found : ${error.message}`);
  }
};

const DeleteToDo = async (request, h) => {
  const { id } = request.params;
  try {
    const todo = await ToDo.findByIdAndDelete(
      { _id: id },
      {
        new: true,
      }
    );
    if (todo) {
      const result = {
        ...todo.toObject(),
        _id: todo._id.toHexString(),
      };
      return result;
    } else {
      return h.response({ message: `Can't find todo id: ${id}` }).code(400);
    }
  } catch (error) {
    return Boom.notFound(`Resource not found : ${error.message}`);
  }
};

module.exports = {
  GetToken,
  AddToDo,
  GetToDoList,
  GetToDoById,
  UpdateToDo,
  DeleteToDo,
};
