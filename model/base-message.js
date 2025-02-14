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

const NotFound = () => {
    return {
        code: 404,
        message: `Not found!`,
    }
}

module.exports = {
    FieldIsRequired,
    Success,
    NotFound
}
