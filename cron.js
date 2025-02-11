const { loadCachedCategory, loadCachedCategoryAdmin } = require('./lib/category.lib');
const schedule = require('node-schedule');

schedule.scheduleJob('* * * * *', () => {
    loadCachedCategory();
    loadCachedCategoryAdmin();
});