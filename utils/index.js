const mongoose = require("mongoose");
const validate = (schema) => (req, res, next) => {
  const {error} = schema.validate(req.body, {abortEarly: false});
  if (error) {
    return res.status(400).json({success: false, errors: error.details.map(err => err.message)});
  }
  next();
};

const convertObjectToJSONString = (data) => {
  try {
    return JSON.stringify(data)
  } catch (error) {
    throw new Error('Invalid object format for JSON conversion')
  }
}

const convertObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectId");
  }
  return new mongoose.Types.ObjectId(id);
};

module.exports = {
  validate, convertObjectToJSONString, convertObjectId
}