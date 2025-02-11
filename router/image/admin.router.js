const express = require('express');
const router = express.Router();

const UploadMiddleware = require('../../middlewares/image');

const ImageController = require('../../controller/image.controller');

router.post('/upload', UploadMiddleware.checkBeforeUpload, ImageController.upload);
router.get('/:videoName', ImageController.video);

module.exports = router;