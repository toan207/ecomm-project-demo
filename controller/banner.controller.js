const Banner = require('../schema').models.Banner;

async function add(req, res) {
    const { image, order } = req.body;
    const banner = await Banner.create({ image, order });
    const result = Success();
    ResponseLib(res, result.code, result.message, banner);
}

async function list(req, res) {
    const query = UserFilterConditionInit();
    const banners = await Banner.find(query).sort({ order: -1 });

    const result = Success();
    ResponseLib(res, result.code, result.message, banners);
}

async function adminList(req, res) {
    const query = AdminFilterConditionInit();
    const banners = await Banner.find(query).sort({ order: -1 });

    const result = Success();
    ResponseLib(res, result.code, result.message, banners);
}

async function update(req, res) {
    const { id } = req.params;
    const { image, order } = req.body;
    const banner = await Banner.findByIdAndUpdate(id, { image, order });
    const result = Success();
    ResponseLib(res, result.code, result.message, banner);
}

async function remove(req, res) {
    const { id } = req.params;
    const banner = await Banner.findByIdAndUpdate(id, { delete: true });
    const result = Success();
    ResponseLib(res, result.code, result.message, banner);
}

async function updateOrder(req, res) {
    const { banners } = req.body;

    for (let i = 0; i < banners.length; i++) {
        await Banner.findByIdAndUpdate(banners[i]._id, { order: i });
    }

    const result = Success();
    ResponseLib(res, result.code, result.message, banners);
}

module.exports = {
    add,
    list,
    adminList,
    update,
    remove,
    updateOrder
}