const express = require("express");
const router = express.Router();

const AccountRouter = require('./account/admin_account.router');
const ImageRouter = require('./image/admin.router');

router.use('/account', AccountRouter);
router.use('/image', ImageRouter);

module.exports = router;
