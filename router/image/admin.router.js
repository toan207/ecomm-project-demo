const express = require('express');
const router = express.Router();

const UploadMiddleware = require('../../middlewares/image');

const ImageController = require('../../controller/image.controller');


module.exports = router;