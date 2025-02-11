const UserFilterConditionInit = () => {
    return { delete: { $ne: true } };
}

const AdminFilterConditionInit = () => {
    return { delete: { $ne: true }, hide: { $ne: true } };
}

module.exports = {
    UserFilterConditionInit,
    AdminFilterConditionInit
}