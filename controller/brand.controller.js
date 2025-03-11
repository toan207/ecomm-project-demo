const Brand = require('../schema').models.Brand;
const {ResponseLib} = require('../lib/response.lib');
const {FieldIsRequired, Success} = require('../model/base-message');
const {UserFilterConditionInit, AdminFilterConditionInit} = require('../model/filter-condition');
const {Paging} = require('../model/paging');
const LogService = require('../services/log.service')
const {convertObjectToJSONString} = require("../utils");

//------------------------------- import --------------------------------------//


async function add(req, res) {
  const {name, image} = req.body;
  
  if (!name) {
    const result = FieldIsRequired('name');
    return ResponseLib(res, result.code, result.message, null);
  }
  const brand = await Brand.create({name, image});
  const result = Success();
  await LogService.addLog(LogService.LogType.CREATE, LogService.Action.BRAND, req.user._id, "", convertObjectToJSONString(req.body), "Create brand Success")
  ResponseLib(res, result.code, result.message, brand);
}

async function list(req, res) {
  const {page, limit, search} = req.query;
  
  const query = UserFilterConditionInit();
  if (search) query.name = {$regex: search, $options: 'i'};
  const brands = await Brand.find(query).skip((page - 1) * limit).limit(limit)
  const count = await Brand.countDocuments(query)
  
  const paging = Paging(page, limit, count);
  const result = Success();
  
  ResponseLib(res, result.code, result.message, {paging, data: brands});
}

async function adminList(req, res) {
  const {page, limit} = req.query;
  let query = {};
  const {search} = req.query;
  if (search) query.name = {$regex: search, $options: 'i'};
  
  const brands = await Brand.find(query).skip((page - 1) * limit).limit(limit);
  const paging = Paging(page, limit, brands.length);
  const result = Success();
  
  ResponseLib(res, result.code, result.message, {paging, data: brands});
}

async function update(req, res) {
  const {id} = req.params;
  const {name, image} = req.body;
  
  if (!id) {
    const result = FieldIsRequired('id');
    return ResponseLib(res, result.code, result.message, null);
  }
  if (!name) {
    const result = FieldIsRequired('name');
    return ResponseLib(res, result.code, result.message, null);
  }
  
  const brand = await Brand.findByIdAndUpdate(id, {name, image});
  const result = Success();
  await LogService.addLog(LogService.LogType.UPDATE, LogService.Action.BRAND, req.user._id, "", convertObjectToJSONString(req.body), "update brand Success")
  
  ResponseLib(res, result.code, result.message, brand._id);
}

async function deleteItem(req, res) {
  const {id} = req.params;
  const {dele} = req.body
  const brand = await Brand.findByIdAndUpdate(id, {delete: dele});
  const result = Success();
  await LogService.addLog(LogService.LogType.DELETE, LogService.Action.BRAND, req.user._id, "", convertObjectToJSONString(req.body), "delete brand Success")
  ResponseLib(res, result.code, result.message, brand._id);
}

async function hideItem(req, res) {
  const {id} = req.params;
  const {hide} = req.body
  const brand = await Brand.findByIdAndUpdate(id, {hide: hide});
  const result = Success();
  await LogService.addLog(LogService.LogType.HIDE, LogService.Action.BRAND, req.user._id, "", convertObjectToJSONString(req.body), "hide brand Success")
  ResponseLib(res, result.code, result.message, brand._id);
}

async function get(req, res) {
  const {id} = req.params;
  const brand = await Brand.findById(id);
  const result = Success();
  ResponseLib(res, result.code, result.message, brand);
}

async function getAll(req, res) {
  const brands = await Brand.find({hide: false, delete: false});
  const result = Success();
  ResponseLib(res, result.code, result.message, {data: brands});
}

module.exports = {
  add,
  list,
  adminList,
  update,
  deleteItem,
  hideItem,
  get,
  getAll
};