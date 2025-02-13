const { Router } = require('express');
const { adminList, add, update, remove, updateOrder } = require('../../controller/banner.controller');

const router = Router();

router.get('/admin', adminList);
router.post('/admin', add);
router.put('/admin/:id', update);
router.delete('/admin/:id', remove);
router.put('/admin/order', updateOrder);

module.exports = router;