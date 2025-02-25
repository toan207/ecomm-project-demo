const Category = require("../schema").models.Category;
const { ResponseLib } = require("../lib/response.lib");
const { FieldIsRequired, Success } = require("../model/base-message");
const { Paging } = require("../model/paging");
const { getCategory, getCategoryAdmin } = require("../lib/category.lib");

async function add(req, res) {
  const { name, parent, image, order } = req.body;
  // console.log(req.headers['user-agent'])
  if (!name) {
    const result = FieldIsRequired("name");
    return ResponseLib(res, result.code, result.message, null);
  }

  let category;
  if (parent) {
    const parentCategory = await Category.findById(parent);
    if (!parentCategory) {
      return ResponseLib(res, 404, "Parent category not found", null);
    }
    category = await Category.create({ name, parent, image, order });
  } else {
    category = await Category.create({ name, image, order });
  }

  const result = Success();
  ResponseLib(res, result.code, result.message, category);
}

async function list(req, res) {
  const { page, limit } = req.query;

  const categories = await getCategory();
  const paging = Paging(page, limit, categories.length);

  const result = Success();
  ResponseLib(res, result.code, result.message, { paging, categories });
}

async function adminList(req, res) {
  const { page, limit, search } = req.query;
  let query = { delete: false };
  if (search) query.name = { $regex: search, $options: 'i' };

  const categories = await Category.find(query).skip((page - 1) * limit).limit(limit).populate('parent','name');
  const paging = Paging(page, limit, categories.length);

  const result = Success();
  ResponseLib(res, result.code, result.message, { paging, data: categories });
}

async function update(req, res) {
  const { id } = req.params;
  const { name, parent, image, order } = req.body;

  if (!id) {
    const result = FieldIsRequired("id");
    return ResponseLib(res, result.code, result.message, null);
  }
  if (!name) {
    const result = FieldIsRequired("name");
    return ResponseLib(res, result.code, result.message, null);
  }

  const category = await Category.findByIdAndUpdate(id, {
    name,
    parent,
    image,
    order,
  });
  const result = Success();
  ResponseLib(res, result.code, result.message, category._id);
}

async function deleteItem(req, res) {
  const { id } = req.params;
  const {dele} = req.body
  await Category.findByIdAndUpdate(id, { delete: dele });
  const result = Success();
  ResponseLib(res, result.code, result.message,id);
}

async function hideItem(req, res) {
  const { id } = req.params;
  const {hide} = req.body
  const category = await Category.findByIdAndUpdate(id, { hide: hide });
  const result = Success();
  ResponseLib(res, result.code, result.message, category._id);
}

async function get(req, res) {
  const { id } = req.params;
  const category = await Category.findById(id);
  const result = Success();
  ResponseLib(res, result.code, result.message, category);
}

async function getAll(req, res) {
  const categories = await Category.find({ hide: false, delete: false });
  const result = Success();
  ResponseLib(res, result.code, result.message, { data: categories });
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
