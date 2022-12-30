class NotFoundError extends Error {
    statusCode = 404
    constructor(message) {
        super(message || 'Not Found')
        this.name = this.constructor.name
    }
}

exports.NotFoundError = NotFoundError