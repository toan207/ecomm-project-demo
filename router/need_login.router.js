const express = require('express');
const router = express.Router();

const AccountRouter = require('./account/need_login_account.router');

router.use('/account', AccountRouter);

module.exports = router;