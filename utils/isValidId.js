module.exports = id => {
  const ObjectId = require('mongoose').Types.ObjectId;
  try {
    return ObjectId(id) == id;
  } catch (err) {
    return false;
  }
};
