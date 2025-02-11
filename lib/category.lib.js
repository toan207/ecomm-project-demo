const Category = require('../schema').models.Category;
const { AdminFilterConditionInit, UserFilterConditionInit } = require('../model/filter-condition');

var cached = [];
var cached_admin = [];

async function getCategory() {
    if (cached.length > 0) {
        return cached;
    }
    return loadCachedCategory();
}

async function loadCachedCategory() {
    const categories = await Category.find(UserFilterConditionInit()).lean();
    const parents_map = {};

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        parents_map[category._id] = i;
    };

    categories.forEach(category => {
        if (category.parent != null) {
            const parent_index = parents_map[category.parent];
            if (!categories[parent_index].children) {
                categories[parent_index].children = [];
            }
            categories[parent_index].children.push(category);
        }
    });

    const parents = categories.filter(category => category.parent == null);
    cached = parents;
    return parents;
}

async function getCategoryAdmin() {
    if (cached_admin.length > 0) {
        return cached_admin;
    }
    return loadCachedCategoryAdmin();
}

async function loadCachedCategoryAdmin() {
    const categories = await Category.find(AdminFilterConditionInit()).lean();
    const parents_map = {};

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        parents_map[category._id] = i;
    };

    categories.forEach(category => {
        if (category.parent != null) {
            const parent_index = parents_map[category.parent];
            if (!categories[parent_index].children) {
                categories[parent_index].children = [];
            }
            categories[parent_index].children.push(category);
        }
    });

    const parents = categories.filter(category => category.parent == null);
    cached_admin = parents;
    return parents;
}

module.exports = {
    getCategory,
    loadCachedCategory,
    getCategoryAdmin,
    loadCachedCategoryAdmin
}