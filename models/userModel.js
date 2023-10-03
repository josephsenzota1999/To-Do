const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
{
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, unique: true },
	password: { type: String }
},
{
	timestamps: true // Change "timestamp" to "timestamps"
});

const User = mongoose.model('users', userSchema);

module.exports = User; // Change "modules" to "module"
