const Brand = require('../schema').models.Brand;
const { ResponseLib } = require('../lib/response.lib');
const { FieldIsRequired, Success } = require('../model/base-message');
const { UserFilterConditionInit, AdminFilterConditionInit } = require('../model/filter-condition');
const { Paging } = require('../model/paging');

async function add(req, res) {
    const { name, image } = req.body;

    if (!name) {
        const result = FieldIsRequired('name');
        return ResponseLib(res, result.code, result.message, null);
    }
    const brand = await Brand.create({ name, image });
    const result = Success();
    ResponseLib(res, result.code, result.message, brand);
}

async function list(req, res) {
    const { page, limit } = req.query;

    const query = UserFilterConditionInit();
    const { name } = req.query;
    if (name) query.name = { $regex: name, $options: 'i' };

    const brands = await Brand.find(query).skip(paging.skip).limit(paging.limit);
    const paging = Paging(page, limit, brands.length);
    const result = Success();

    ResponseLib(res, result.code, result.message, { paging, brands });
}

async function adminList(req, res) {
    const { page, limit } = req.query;
    let query = { delete: false };
    const { search } = req.query;
    if (search) query.name = { $regex: search, $options: 'i' };

    const brands = await Brand.find(query).skip((page -1) * limit).limit(limit);
    const paging = Paging(page, limit, brands.length);
    const result = Success();

    ResponseLib(res, result.code, result.message, { paging, data: brands });
}

async function update(req, res) {
    const { id } = req.params;
    const { name, image } = req.body;

    if (!id) {
        const result = FieldIsRequired('id');
        return ResponseLib(res, result.code, result.message, null);
    }
    if (!name) {
        const result = FieldIsRequired('name');
        return ResponseLib(res, result.code, result.message, null);
    }

    const brand = await Brand.findByIdAndUpdate(id, { name, image });
    const result = Success();
    ResponseLib(res, result.code, result.message, brand._id);
}

async function deleteItem(req, res) {
    const { id } = req.params;
    const {dele} = req.body
    const brand = await Brand.findByIdAndUpdate(id, { delete: dele });
    const result = Success();
    ResponseLib(res, result.code, result.message, brand._id);
}

async function hideItem(req, res) {
    const { id } = req.params;
    const {hide} = req.body
    const brand = await Brand.findByIdAndUpdate(id, { hide: hide });
    const result = Success();
    ResponseLib(res, result.code, result.message, brand._id);
}

async function get(req, res) {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    const result = Success();
    ResponseLib(res, result.code, result.message, brand);
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