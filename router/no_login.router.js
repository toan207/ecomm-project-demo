const express = require("express");
const router = express.Router();

const AccountRouter = require('./account/no_login_account.router');
const VietnamRouter = require('./vietnam_district/no_login.router');

router.use('/account', AccountRouter);
router.use('/vietnam', VietnamRouter);

module.exports = router;
