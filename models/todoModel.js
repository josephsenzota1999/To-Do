
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
{
	title: { type: String, required: true },
	description: {type: String, required: true},
	stat: {type: String, required: true}
},

{
	timestamp: true,
}
);

const Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;