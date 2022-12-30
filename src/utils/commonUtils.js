// Higher Order Function for Simple *Function
exports.safeBackground = (fn, timeOut = 1) => (...params) => setTimeout(_ => fn(...params), timeOut)

// Higher Order Function for Simple *Promises
exports.safePromise = (fn) => (...params) => fn(...params).then((res) => console.log(`SafeResponse: ${res}`)).catch((err) => console.error(`Oops, ${err.msg}`))

// Success Response
exports.successResponse = (statusCode = 200, data = []) => {
    return {
        "statusCode": statusCode,
        "status": "SUCCESS",
        "data": data,
    }
}

// Error Response
exports.errorResponse = (statusCode = 422, errors = []) => {
    return {
        "statusCode": statusCode,
        "status": "ERROR",
        "errors": errors
    }
}
