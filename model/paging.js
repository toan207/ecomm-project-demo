export const Paging = (page, limit, totalData) => {
    const skip = (page - 1) * limit;
    const totalPage = Math.ceil(totalData / limit);
    return { page, skip, limit, totalPage };
}