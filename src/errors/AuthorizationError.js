class AuthorizationError extends Error {
    statusCode = 401
    constructor(message) {
        super(message || 'Authorization Error')
        this.name = this.constructor.name
    }
}

exports.AuthorizationError = AuthorizationError