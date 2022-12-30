const {errorResponse} = require('../utils/commonUtils')
const {UploadError} = require('./UploadError')
const {NotFoundError} = require('./NotFoundError')
const {ValidationError} = require('./ValidationError')
const {AuthenticationError} = require('./AuthenticationError')
const {AuthorizationError} = require('./AuthorizationError')
const { debug } = require('../../config/serverConfig')
const multer = require('multer')

const showStackTrace = err => debug ? {stackTrace: err.stack} : null 

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
                return res.status(422).send(errorResponse(
                    422,
                    [{'msg': err.message || 'There was error while uploading file'}, showStackTrace(err)]
                ))
            }

            if (err instanceof ValidationError) {
                return res.status(err.statusCode).send(errorResponse(
                    err.statusCode,
                    err.errors
                ))
            }

            if (err instanceof NotFoundError) {
                return res.status(err.statusCode).send(errorResponse(
                    err.statusCode,
                    [{'msg': err.message || 'Not found'}, showStackTrace(err)]
                ))
            }

            if (err instanceof AuthenticationError) {
                return res.status(err.statusCode).send(errorResponse(
                    err.statusCode,
                    [{msg: err.message || 'Credentials do not match'}, showStackTrace(err)]
                ))
            }

            if (err instanceof AuthorizationError) {
                return res.status(err.statusCode).send(errorResponse(
                    err.statusCode,
                    [{msg: err.message || 'Access denied'}, showStackTrace(err)]
                ))
            }
        }
        
        // console.error(err.stack)

        return res.status(500).send(errorResponse(
            500, [{msg: 'Internal Server Error'},showStackTrace(err)]
        ))
    })
}
