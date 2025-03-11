const Banner = require("../schema").models.Banner;
const {
  AdminFilterConditionInit,
  UserFilterConditionInit,
} = require("../model/filter-condition");
const {FieldIsRequired, Success} = require("../model/base-message");
const {ResponseLib} = require("../lib/response.lib");
const LogService = require('../services/log.service')

//------------------------------- import --------------------------------------//


async function add(req, res) {
  const {image} = req.body;
  const banner = await Banner.create({image});
  const result = Success();
  await LogService.addLog(LogService.LogType.CREATE, LogService.Action.BANNER, req.user._id, "", "", "Create banner Success")
  ResponseLib(res, result.code, result.message, banner);
}

async function list(req, res) {
  const query = UserFilterConditionInit();
  const banners = await Banner.find(query).sort({order: -1});
  
  const result = Success();
  ResponseLib(res, result.code, result.message, banners);
}

async function adminList(req, res) {
  let query = {};
  const banners = await Banner.find(query).sort({order: -1});
  const result = Success();
  ResponseLib(res, result.code, result.message, {data: banners});
}

async function update(req, res) {
  const {id} = req.params;
  const {image, order} = req.body;
  const banner = await Banner.findByIdAndUpdate(id, {image, order});
  const result = Success();
  await LogService.addLog(LogService.LogType.UPDATE, LogService.Action.BANNER, req.user._id, "", "", "update banner Success")
  ResponseLib(res, result.code, result.message, banner);
}

async function remove(req, res) {
  const {id} = req.params;
  const {dele} = req.body;
  const banner = await Banner.findByIdAndUpdate(id, {delete: dele});
  const result = Success();
  await LogService.addLog(LogService.LogType.DELETE, LogService.Action.BANNER, req.user._id, "", "", "delete banner Success")
  ResponseLib(res, result.code, result.message, banner);
}

async function updateOrder(req, res) {
  const {banners} = req.body;
  for (let i = 0; i < banners.length; i++) {
    await Banner.findByIdAndUpdate(banners[i], {order: i + 1});
  }
  
  const result = Success();
  await LogService.addLog(LogService.LogType.UPDATE, LogService.Action.BANNER, req.user._id, "", "", "update banner Success")
  ResponseLib(res, result.code, result.message, banners);
}

async function hide(req, res) {
  const {id} = req.params;
  const {hide} = req.body;
  const banner = await Banner.findByIdAndUpdate(id, {hide: hide});
  const result = Success();
  await LogService.addLog(LogService.LogType.HIDE, LogService.Action.BANNER, req.user._id, "", "", "hide banner Success")
  ResponseLib(res, result.code, result.message, banner._id);
}

module.exports = {
  add,
  list,
  adminList,
  update,
  remove,
  updateOrder,
  hide,
};
