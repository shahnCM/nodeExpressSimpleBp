const { AuthorizationError } = require("../errors/AuthorizationError")
const { successResponse } = require("../utils/commonUtils")

exports.testAction = async function testAction(req, res, next) {
    const a = 2
    a = 3
    // throw new AuthorizationError();
    const response = successResponse({ text: 'REACHED ACTION DISPATCHER' })
    return res.status(200).send(response)
}