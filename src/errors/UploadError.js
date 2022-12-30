class UploadError extends Error {
    statusCode = 422
    constructor(message) {
        super(message || 'Upload Error')
        this.name = this.constructor.name
    }
}

exports.UploadError = UploadError