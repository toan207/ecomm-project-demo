const { loadCachedCategory } = require('./lib/category.lib');
const schedule = require('node-schedule');

schedule.scheduleJob('* * * * *', () => {
    loadCachedCategory();
});