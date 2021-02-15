const express = require('express')
const bodyParser = require('body-parser')

let rawData = require('../data');
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
    console.log(`raw: ${rawData}`)
    const ssData = utils.getSolarSystems('', rawData)
    res.setHeader('Content-Type', 'application/json')
    res.json(ssData)
    // res.end('Will send details of ALL the solar systems to you!')
})
.post((req, res, next) => {
    // Add a new solar system
    // Will contain a body in json format, which must include Id and name properties
    const ssId = req.body.id
    const ssName = req.body.name
    const ssData = utils.addSolarSystem(ssId, ssName, rawData)
    res.setHeader('Content-Type', 'application/json')
    res.json(ssData)
    // res.end('Will add the solar system: \'' + ssName + '\', with an Id: ' + ssId)
})
.put((req, res, next) => {
    // Update an existing solar system - not used
    res.status(403).send('PUT operation not supported on /solarSystem')
})
.delete((req, res, next) => {
    // Delete ALL solar systems
    rawData = []
    res.setHeader('Content-Type', 'application/json')
    res.json(rawData)
    // res.end('Deleting ALL the solar systems!!!')
})





// #################################################
solarSystemRouter.route('/:solarSystemId')
// #################################################

// This handles ALL calls, no matter what the verb, for the /solarSystem/:solarSystemId type API
.all((req, res, next) => {
    // console.log(`Solar System ID: ${req.params.solarSystemId}`)
    console.log(`Solar System ID: ${req.params.solarSystemId}`)
    next()
})

.get((req, res, next) => {
    const ssId = req.params.solarSystemId
    const ssData = utils.getSolarSystems(ssId, rawData)
    res.setHeader('Content-Type', 'application/json')
    res.json(ssData)
    // res.end('Will send details of the solar system \'' + req.params.solarSystemId + '\' to you.')
})

.post((req, res, next) => {
    // Add a status code which will overwrite the one set earlier
    res.statusCode = 403
    res.end("POST operation not supported on /solarSystem/'" + req.params.solarSystemId + "'")
})

.put((req, res, next) => {
    // Change the name of the solar system
    const ssId = req.params.solarSystemId

    if (req.body.id == ssId) {
        // Body matches request parameter
        const updatedData = utils.updateSolarSystem(ssId, req.body.name, rawData)
        if (updatedData[0]) {
            rawData = updatedData[1]
            res.setHeader('Content-Type', 'application/json')
            res.json(updatedData[2])
        } else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.json({"Error": "Error updating solar system '" + ssId + "', it does not exist"})
        }
    } else {
        // Body/parameter mismatch
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.json({"Error": "Mismatch!  Body Id: '" + req.body.id + "', URL parameter: '" + ssId + "'"})
    }
    // res.write('Updating the solar system: ' + req.params.solarSystemId + '\n')
    // res.end('Will update the solar system: ' + req.body.id + ' with details: ' + req.body.name)
})

.delete((req, res, next) => {
    // Delete selected solar system
    const ssId = req.params.solarSystemId
    const newData = utils.deleteSolarSystem(ssId, rawData)
    if (newData[0]) {
        // If success then update raw data and nothing else
        rawData = newData[1]
        res.end()
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.json({"Error": "Error deleting solar system '" + ssId + "', it does not exist"})
    }
})





// #################################################
solarSystemRouter.route('/:solarSystemId/weight')
// #################################################

// This handles ALL calls, no matter what the verb, for the /solarSystem/:solarSystemId/planet/:planetId type API
.all((req, res, next) => {
    console.log(`Solar System ID: ${req.params.solarSystemId}`)
    next()
})

.get((req, res, next) => {
    // Return just the weight of the specified solar system
    const ssId = req.params.solarSystemId
    const newData = utils.getSolarSystemWeight(ssId, rawData)
    if (newData[0]) {
        res.setHeader('Content-Type', 'application/json')
        res.json(newData[1])
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.json({"Error": "Error calculating weight of solar system '" + ssId + "', it does not exist"})
    }
    // res.write('Solar System: ' + req.params.solarSystemId + '\n')
    // res.end('Has a weight of ' + 'YYYYYYY tons' )
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






// #################################################
solarSystemRouter.route('/:solarSystemId/planet')
// #################################################

// This handles ALL calls, no matter what the verb, for the /solarSystem/:solarSystemId/planet type API
.all((req, res, next) => {
    console.log(`Solar System ID: ${req.params.solarSystemId}`)
    next()
})

.get((req, res, next) => {
    // Return a list of planets for specified solar system
    const ssId = req.params.solarSystemId
    const newData = utils.getPlanets(ssId, '', rawData)
    if (newData[0]) {
        res.setHeader('Content-Type', 'application/json')
        res.json(newData[1])
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.json({"Error": newData[1]})
    }
    // res.end('Will send details of all the planets in solar system \'' + req.params.solarSystemId + '\' to you.')
})

.post((req, res, next) => {
    // Will contain a body in json format
    // The body must include id, name,weight and type properties
    const newPlanet = {
        "id": req.body.id,
        "name": req.body.name,
        "weight": req.body.weight,
        "type": "planet"
    }
    const newData = utils.addPlanet(req.params.solarSystemId, newPlanet, rawData)
    if (newData[0]) {
        res.setHeader('Content-Type', 'application/json')
        res.json(newData[1])
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.json({"Error": newData[1]})
    }
    // res.write('Will add the planet ' + req.body.id + '\n')
    // res.write('To the solar system: ' + req.params.solarSystemId + '\n')
    // res.end('With Name: ' + req.body.name + ' and Weight: ' + req.body.weight)
})

.put((req, res, next) => {
    // Add a status code which will overwrite the one set earlier
    res.statusCode = 403
    res.end('PUT operation not supported on /solarSystem/' + req.params.solarSystemId + '/planet')
})

.delete((req, res, next) => {
    // Delete ALL planets in specified solar system

    const ssId = req.params.solarSystemId
    const newData = utils.deletePlanet(ssId, '', rawData)

    if (newData[0]) {
        // If success then update raw data and nothing else
        rawData = newData[1]
        res.end()
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.json({"Error": newData[1]})
    }
    // res.end('Deleting all planets in solar system: ' + req.params.solarSystemId)
})


// ALL THE ABOVE ARE COMPLETE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



solarSystemRouter.route('/:solarSystemId/planet/:planetId')

// This handles ALL calls, no matter what the verb, for the /solarSystem/:solarSystemId/planet/:planetId type API
.all((req, res, next) => {
    console.log(`Solar System ID: ${req.params.solarSystemId}`)
    console.log(`Planet ID: ${req.params.planetId}`)
    next()
})

.get((req, res, next) => {
    const ssId = req.params.solarSystemId
    const newData = utils.getPlanets(ssId, req.params.planetId, rawData)
    if (newData[0]) {
        res.setHeader('Content-Type', 'application/json')
        res.json(newData[1])
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.json({"Error": newData[1]})
    }


    res.end('Will send details of planet + \'' + req.params.planetId + '\' in solar system \'' + req.params.solarSystemId + '\' to you.')
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
