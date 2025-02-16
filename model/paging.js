const Paging = (page, limit, totalData) => {
    if (page == null) page = 1;
    if (limit == null) limit = 10;
    const skip = (page - 1) * limit;
    const totalPage = Math.ceil(totalData / limit);
    return { page, skip, limit, totalPage: totalPage || 0 };
}

module.exports = {
    Paging
}