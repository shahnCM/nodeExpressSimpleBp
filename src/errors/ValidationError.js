class ValidationError extends Error {
    statusCode = 400
    errors = []
    constructor(message, errors = []) {
        super(message || 'Validation Error')
        this.name = this.constructor.name
        this.errors = errors
    }
}

exports.ValidationError = ValidationError