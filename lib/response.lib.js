const ResponseLib = (res, status, message, data) => {
    res.status(status).json({
        success: true,
        message,
        data
    });
}

module.exports = {
    ResponseLib
}