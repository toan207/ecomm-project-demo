const Branch = require('../schema').models.Branch;
const { ResponseLib } = require('../lib/response.lib');
const { Success } = require('../model/base-message');
const { UserFilterConditionInit, AdminFilterConditionInit } = require('../model/filter-condition');
const { Paging } = require('../model/paging');

async function add(req, res) {
    const { name } = req.body;

    if (!name) {
        const result = FieldIsRequired('name');
        return ResponseLib(res, result.code, result.message, null);
    }
    const branch = await Branch.create({ name });

    ResponseLib(res, 200, Success(), branch);
}

async function list(req, res) {
    const { page, limit } = req.query;

    const query = UserFilterConditionInit();
    const { name } = req.query;
    if (name) query.name = { $regex: name, $options: 'i' };

    const branches = await Branch.find(query).skip(paging.skip).limit(paging.limit);
    const paging = Paging(page, limit, branches.length);
    const result = Success();

    ResponseLib(res, result.code, result.message, { paging, branches });
}

async function adminList(req, res) {
    const { page, limit } = req.query;
    const query = AdminFilterConditionInit();
    const { name } = req.query;
    if (name) query.name = { $regex: name, $options: 'i' };

    const branches = await Branch.find(query).skip(paging.skip).limit(paging.limit);
    const paging = Paging(page, limit, branches.length);
    const result = Success();

    ResponseLib(res, result.code, result.message, { paging, branches });
}

async function update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
        const result = FieldIsRequired('id');
        return ResponseLib(res, result.code, result.message, null);
    }
    if (!name) {
        const result = FieldIsRequired('name');
        return ResponseLib(res, result.code, result.message, null);
    }

    const branch = await Branch.findByIdAndUpdate(id, { name });
    const result = Success();
    ResponseLib(res, result.code, result.message, branch);
}

async function deleteItem(req, res) {
    const { id } = req.params;
    const branch = await Branch.findByIdAndUpdate(id, { delete: true });
    const result = Success();
    ResponseLib(res, result.code, result.message, branch._id);
}

async function hideItem(req, res) {
    const { id } = req.params;
    const branch = await Branch.findByIdAndUpdate(id, { hide: true });
    const result = Success();
    ResponseLib(res, result.code, result.message, branch._id);
}

async function get(req, res) {
    const { id } = req.params;
    const branch = await Branch.findById(id);
    const result = Success();
    ResponseLib(res, result.code, result.message, branch);
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