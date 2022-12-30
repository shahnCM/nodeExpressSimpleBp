class AuthenticationError extends Error {
    statusCode = 403
    constructor(message = "") {
        super(message || 'Authentication Error')
        this.name = this.constructor.name
    }
}

exports.AuthenticationError = AuthenticationError