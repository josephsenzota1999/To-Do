
const mongoose = require('mongoose');

const inviteSchema = mongoose.Schema(
{
	email: {type: String, required: true},
	token: {type: String, required:true},
	createdAt: {type: String}
}

)

const Invite = mongoose.model('invite', inviteSchema);

module.exports = Invite; // Change "modules" to "module"
