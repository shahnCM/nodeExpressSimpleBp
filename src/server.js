const { keepAlive } = require('./keepAlive')
const { port } = require('../config/serverConfig')

exports.bootServer = async function bootServer(app) {

    // Prevent Crash
    keepAlive(app)

    try {
        // Boot Server
        app.listen(port, () => {
            console.log(`Connected successfully on port ${port}`)
        });

    } catch (error) {
        console.error(`Error Occurred: ${error.message}`)
    }
}