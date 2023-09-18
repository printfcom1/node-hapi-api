require('dotenv').config();
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const todoSchema = new Schema(
  {
    title: String,
    descriptions: String,
  },
  {
    versionKey: false, // Exclude the __v field from the response
    timestamps: true,
  }
);

const ToDo = model('Todo', todoSchema);

module.exports = {
  ToDo,
};
