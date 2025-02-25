const Paging = (page, limit, totalData) => {
    if (page == null) page = 1;
    if (limit == null) limit = 10;

    const totalPages = Math.ceil(totalData / limit) || 0;
    const hasNext = page < totalPages;

    return { 
        page, 
        totalPages, 
        totalItems: totalData, 
        hasNext 
    };
}

module.exports = {
    Paging
}
