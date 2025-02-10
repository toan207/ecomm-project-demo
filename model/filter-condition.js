export const UserFilterConditionInit = () => {
    return { delete: { $ne: true } };
}

export const AdminFilterConditionInit = () => {
    return { delete: { $ne: true }, hide: { $ne: true } };
}