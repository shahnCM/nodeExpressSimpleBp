const { request: req, response: res, next: next } = require('express')
const { routes: testRoutes } = require('./test')
const { handleError: handleRouteError } = require('../errors/handleError')

exports.initiateRoutes = async function initiateRoutes(app) {
    testRoutes(app)         // Api Routes
    handleRouteError(app)   // ErrorHandling
}
