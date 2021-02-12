const express = require('express')
const bodyParser = require('body-parser')

const rawData = require('../data');
const utils = require('../utils/utils')

const solarSystemRouter = express.Router()

solarSystemRouter.use(bodyParser.json())

solarSystemRouter.route('/')

// This handles ALL calls, no matter what the verb, for the /solarSystem API - as defined in index.js
// Useful for setting up the status code and headers
// Notice within this Express Router file the preceeding 'app' is no longer required and nor is the '/solarSystem'
// as this route only deals with '/solarSystem'
.all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    // next() then calls the app.get() function for a GET request
    // app.put() for a PUT request, etc...
    next()
})
// Called by next() and useful for setting up the body of the responce
.get((req, res, next) => {
    const ssData = utils.getSolarSystems('1')
    res.setHeader('Content-Type', 'application/json')

    res.json(ssData)
    // res.end('Will send details of all the solar systems to you!')
})
.post((req, res, next) => {
    // Will contain a body in json format
    // The body must include a name and description properties
    res.end('Will add the solar system: ' + req.body.name + ' with Details: ' + req.body.description)
})
.put((req, res, next) => {
    // Add a status code which will overwrite the one set earlier
    //
    // Check new code below works OK!!!!
    //
    // res.statusCode = 403
    // res.end('PUT operation not supported on /solarSystem')
    res.status(403).send('PUT operation not supported on /solarSystem')
})
.delete((req, res, next) => {
    // Return a simple response
    res.end('Deleting all the solar systems!!!')
})



solarSystemRouter.route('/:solarSystemId')

// This handles ALL calls, no matter what the verb, for the /solarSystem/:solarSystemId type API
.all((req, res, next) => {
    console.log(`Solar System ID: ${req.params.solarSystemId}`)
    next()
})
.get((req, res, next) => {
    res.end('Will send details of the solar system \'' + req.params.solarSystemId + '\' to you.')
})
.post((req, res, next) => {
    // Add a status code which will overwrite the one set earlier
    res.statusCode = 403
    res.end('POST operation not supported on /solarSystem/' + req.params.solarSystemId)
})
.put((req, res, next) => {
    // Use res.write() as many times as required to write long messages
    res.write('Updating the solar system: ' + req.params.solarSystemId + '\n')
    res.end('Will update the solar system: ' + req.body.name + ' with details: ' + req.body.description)
})
.delete((req, res, next) => {
    // Return a simple response
    res.end('Deleting solar system: ' + req.params.solarSystemId)
})


solarSystemRouter.route('/:solarSystemId/weight')

// This handles ALL calls, no matter what the verb, for the /solarSystem/:solarSystemId/planet/:planetId type API
.all((req, res, next) => {
    console.log(`Solar System ID: ${req.params.solarSystemId}`)
    next()
})
.get((req, res, next) => {
    res.write('Solar System: ' + req.params.solarSystemId + '\n')
    res.end('Has a weight of ' + 'YYYYYYY tons' )
})
.post((req, res, next) => {
    // Add a status code which will overwrite the one set earlier
    res.statusCode = 403
    res.end('POST operation not supported on /solarSystem/' + req.params.solarSystemId + '/weight')
})
.put((req, res, next) => {
     // Add a status code which will overwrite the one set earlier
     res.statusCode = 403
     res.end('PUT operation not supported on /solarSystem/' + req.params.solarSystemId + '/weight')
})
.delete((req, res, next) => {
    // Return a simple response
    res.statusCode = 403
     res.end('DELETE operation not supported on /solarSystem/' + req.params.solarSystemId + '/weight')
})


solarSystemRouter.route('/:solarSystemId/planet')

// This handles ALL calls, no matter what the verb, for the /solarSystem/:solarSystemId/planet type API
.all((req, res, next) => {
    console.log(`Solar System ID: ${req.params.solarSystemId}`)
    next()
})
.get((req, res, next) => {
    res.end('Will send details of all the planets in solar system \'' + req.params.solarSystemId + '\' to you.')
})
.post((req, res, next) => {
    // Will contain a body in json format
    // The body must include a name and description properties
    res.write('Will add the planet ' + req.params.planetId + '\n')
    res.write('To the solar system: ' + req.parames.solarSystemId + '\n')
    res.end('With Name: ' + req.body.name + ' and Weight: ' + req.body.weight)
})
.put((req, res, next) => {
    // Add a status code which will overwrite the one set earlier
    res.statusCode = 403
    res.end('PUT operation not supported on /solarSystem/' + req.params.solarSystemId + '/planet')
})
.delete((req, res, next) => {
    // Return a simple response
    res.end('Deleting all planets in solar system: ' + req.params.solarSystemId)
})


solarSystemRouter.route('/:solarSystemId/planet/:planetId')

// This handles ALL calls, no matter what the verb, for the /solarSystem/:solarSystemId/planet/:planetId type API
.all((req, res, next) => {
    console.log(`Solar System ID: ${req.params.solarSystemId}`)
    console.log(`Planet ID: ${req.params.planetId}`)
    next()
})
.get((req, res, next) => {
    res.end('Will send details of planets + \'' + req.params.planetId + '\' in solar system \'' + req.params.solarSystemId + '\' to you.')
})
.post((req, res, next) => {
    // Add a status code which will overwrite the one set earlier
    res.statusCode = 403
    res.end('POST operation not supported on /solarSystem/' + req.params.solarSystemId + '/planet/' + req.params.planetId)
})
.put((req, res, next) => {
    // Use res.write() as many times as required to write long messages
    res.write('Updating the planet: ' + req.params.planetId + '\n')
    res.write('Within the solar system: ' + req.params.solarSystemId + '\n')
    res.end('With name: ' + req.body.name + ' and weight: ' + req.body.weight)
})
.delete((req, res, next) => {
    // Return a simple response
    res.end('Deleting planet: ' + req.params.planetId + ' in solar system: ' + req.params.solarSystemId)
})


solarSystemRouter.route('/:solarSystemId/planet/:planetId/weight')

// This handles ALL calls, no matter what the verb, for the /solarSystem/:solarSystemId/planet/:planetId type API
.all((req, res, next) => {
    console.log(`Solar System ID: ${req.params.solarSystemId}`)
    console.log(`Planet ID: ${req.params.planetId}`)
    next()
})
.get((req, res, next) => {
    res.write('Planet: ' + req.params.planetId + '\n')
    res.write('in Solar System: ' + req.params.solarSystemId + '\n')
    res.end('Has a weight of ' + 'XXXXX tons' )
})
.post((req, res, next) => {
    // Add a status code which will overwrite the one set earlier
    res.statusCode = 403
    res.end('POST operation not supported on /solarSystem/' + req.params.solarSystemId + '/planet/' + req.params.planetId + '/weight')
})
.put((req, res, next) => {
     // Add a status code which will overwrite the one set earlier
     res.statusCode = 403
     res.end('PUT operation not supported on /solarSystem/' + req.params.solarSystemId + '/planet/' + req.params.planetId + '/weight')
})
.delete((req, res, next) => {
    // Return a simple response
    res.statusCode = 403
     res.end('DELETE operation not supported on /solarSystem/' + req.params.solarSystemId + '/planet/' + req.params.planetId + '/weight')
})


// Remember to export this module
module.exports = solarSystemRouter
