const express = require('express')
const {bootServer} = require('./server')
const {initiateRoutes} = require('./routes')
// const {dbInit} = require('./database/objection/conn')
const { handleError } = require('./errors/handleError')

const app = express()

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))

console.log("BOOTING UP ...");

(async function () {
    // Connect Database
    // await dbInit()
    // Boot NodeJs Server
    await bootServer(app)
    // Initiate Routes
    await initiateRoutes(app)
})();