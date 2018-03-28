module.exports = id => {
	const ObjectId = require('mongoose').Types.ObjectId;
	return ObjectId(id) == id;
};
