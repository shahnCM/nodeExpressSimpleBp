const router = require('express').Router()
const { dispatch } = require('../actionDispatcher')
const testController = require('../controllers/testController')

//Export All Routes
const prefix = '/api/test'
exports.routes = app => app.use(prefix, router)

router.get('/simple', dispatch(testController.testAction))

