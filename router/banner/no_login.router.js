const { Router } = require('express');
const { list } = require('../../controller/banner.controller');

const router = Router();

router.get('/', list);

module.exports = router;