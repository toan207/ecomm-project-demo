const fs = require('fs');
const path = require('path');

const imageFolderPath = path.join(__dirname.split('/controller')[0], 'uploads');

async function video(req, res) {
    const videoName = req.params.videoName;
    const videoPath = path.resolve(path.join(imageFolderPath, videoName));
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = (end - start) + 1;

        const file = fs.createReadStream(videoPath, { start, end });
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
        };

        res.writeHead(206, headers);
        file.pipe(res);
    } else {
        const headers = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(200, headers);
        fs.createReadStream(videoPath).pipe(res);
    }
}

async function info(req, res) {
    const imageName = req.params.imageName;
    const imagePath = path.join(imageFolderPath, imageName);

    if (!fs.existsSync(imagePath)) {
        return res.status(404).send('Image not found.');
    }

    const extension = path.extname(imageName).toLowerCase();
    const contentType = `image/${extension.substr(1)}`;
    res.set('Content-Type', contentType);

    const imageStream = fs.createReadStream(imagePath);
    imageStream.pipe(res);
}

async function upload(req, res) {
    const file = req.files;
    console.log(req.body.name)

    console.log('Uploaded file:', file);
    res.send('File uploaded successfully.');
}

module.exports = {
    video,
    upload,
    info
};
