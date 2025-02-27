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

router.get("", adminList);
router.post("", add);
router.patch("/:id/hide", hide);
router.put("/:id", update);
router.delete("/:id", remove);
router.patch("/order", updateOrder);

module.exports = router;
