const Category = require('../schema').models.Category;
const { ResponseLib } = require('../lib/response.lib');
const { FieldIsRequired, Success } = require('../model/base-message');
const { Paging } = require('../model/paging');
const { getCategory, getCategoryAdmin } = require('../lib/category.lib');

async function add(req, res) {
    const { name, parent, image, order } = req.body;
    // console.log(req.headers['user-agent'])
    if (!name) {
        const result = FieldIsRequired('name');
        return ResponseLib(res, result.code, result.message, null);
    }
    const category = await Category.create({ name, parent, image, order });

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
    const { page, limit } = req.query;

    const categories = await getCategoryAdmin();
    const paging = Paging(page, limit, categories.length);

    const result = Success();
    ResponseLib(res, result.code, result.message, { paging, categories });
}

async function update(req, res) {
    const { id } = req.params;
    const { name, parent, image, order } = req.body;

    if (!id) {
        const result = FieldIsRequired('id');
        return ResponseLib(res, result.code, result.message, null);
    }
    if (!name) {
        const result = FieldIsRequired('name');
        return ResponseLib(res, result.code, result.message, null);
    }

    const category = await Category.findByIdAndUpdate(id, { name, parent, image, order });
    const result = Success();
    ResponseLib(res, result.code, result.message, category._id);
}

async function deleteItem(req, res) {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { delete: true });
    const result = Success();
    ResponseLib(res, result.code, result.message, category._id);
}

async function hideItem(req, res) {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { hide: true });
    const result = Success();
    ResponseLib(res, result.code, result.message, category._id);
}

async function get(req, res) {
    const { id } = req.params;
    const category = await Category.findById(id);
    const result = Success();
    ResponseLib(res, result.code, result.message, category);
}

module.exports = {
    add,
    list,
    adminList,
    update,
    deleteItem,
    hideItem,
    get
};