const { Router } = require("express");
const {
  adminList,
  add,
  update,
  remove,
  updateOrder,
  hide,
} = require("../../controller/banner.controller");

const router = Router();

router.get("/admin", adminList);
router.post("/admin", add);
router.patch("/admin/:id/hide", hide);
router.put("/admin/:id", update);
router.delete("/admin/:id", remove);
router.patch("/admin/order", updateOrder);

module.exports = router;
