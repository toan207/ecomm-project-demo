const FieldIsRequired = (field) => {
    return {
        code: 400,
        message: `Field ${field} is required!`,
    }
}

const Success = () => {
    return {
        code: 200,
        message: `Executed successfully!`,
    }
}

module.exports = {
    FieldIsRequired,
    Success
}
