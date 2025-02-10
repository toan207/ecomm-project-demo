export const FieldIsRequired = (field) => {
    return {
        message: `Field ${field} is required!`,
        status: 400
    }
}

export const Success = () => {
    return {
        message: `Executed successfully!`,
        status: 200
    }
}