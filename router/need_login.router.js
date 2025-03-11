const express = require('express');
const router = express.Router();

const AccountRouter = require('./account/need_login_account.router');
const CartRouter = require('./cart/need_login.router');

router.use('/accounts', AccountRouter);
router.use('/cart', CartRouter);

module.exports = router;