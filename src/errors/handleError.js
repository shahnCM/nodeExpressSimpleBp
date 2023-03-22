const multer = require('multer')
const {UploadError} = require('./UploadError')
const {NotFoundError} = require('./NotFoundError')
const { debug } = require('../../config/serverConfig')
const {ValidationError} = require('./ValidationError')
const {AuthenticationError} = require('./AuthenticationError')
const {AuthorizationError} = require('./AuthorizationError')
const {errorResponse, strEqualsCaseInSensitive} = require('../utils/commonUtils')


const showStackTrace = err => strEqualsCaseInSensitive(debug, 'true') ? {stackTrace: err.stack} : null

exports.handleError = function handleError(app) {

    // Handle 404
    app.use((req, res, next) => next(new NotFoundError(`Requested URL was not found!`)))

    // Handle All Error
    app.use((err, req, res, next) => {

        if (res.headersSent) {
            return next('There was an unhandled error!')
        }

        if (err) {

            if (err instanceof multer.MulterError || err instanceof UploadError) {
                let fallbackErrorMessage = 'There was error while uploading file'
                let uploadError = errorResponse([{msg: err.message || fallbackErrorMessage, ...showStackTrace(err)}], err.statusCode)
                return res.status(err.statusCode).send(uploadError)
            }

            if (err instanceof ValidationError) {
                let validationError = errorResponse(err.errors, err.statusCode)
                return res.status(err.statusCode).send(validationError)
            }

            if (err instanceof NotFoundError) {
                let notFoundError = errorResponse([{msg: err.message, ...showStackTrace(err)}], err.statusCode)
                return res.status(err.statusCode).send(notFoundError)
            }

            if (err instanceof AuthenticationError) {
                let authenticationError = errorResponse([{msg: err.message, ...showStackTrace(err)}], err.statusCode)
                return res.status(err.statusCode).send(authenticationError)
            }

            if (err instanceof AuthorizationError) {
                let authorizationError = errorResponse([{msg: err.message, ...showStackTrace(err)}], err.statusCode)
                return res.status(err.statusCode).send(authorizationError)
            }
        }
        
        // console.error(err.stack)
        let internalError = errorResponse([{msg: 'Internal Server Error', ...showStackTrace(err)}], 500)
        return res.status(500).send(internalError)
    })
}
