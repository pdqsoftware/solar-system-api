// const { forEach } = require("../data")
// const rawData = require("../data")

module.exports = { 
    getSolarSystems(solarSystem, rawData) {
        let returnData = []
        const noOfSolarSystems = rawData.length

        console.log(rawData)
        console.log(rawData[1])
        console.log(solarSystem)
        console.log(typeof solarSystem)
        console.log(`Number of solar systems stored: ${noOfSolarSystems}`)

        // Return all details of all solar systems
        if (solarSystem === '') {
            // Calculate weights
            rawData.forEach((ss) => {
                ss.totalWeight = calculateTotalWeight(ss.entities)
            })
            return rawData;
        }

        // Return details of specified solar system, else []
        if (solarSystem.length > 0) {
            let found = -1;
            console.log(`Rawdata: ${rawData}`)
            // Loop through object entries inside array
            rawData.forEach((ss, index) => {
                console.log(`ssId: ${ss.id}`)
                if (ss.id == solarSystem) {
                    console.log('match')
                    found = index
                    rawData[found].totalWeight = calculateTotalWeight(ss.entities)
                }
            })
            if (found >= 0) {
                console.log(`found = ${found}`)
                return rawData[found]
            } 
            // No data found for this solar system Id
            return {}
        }
    },
    addSolarSystem(solarSystemId, solarSystemName, rawData) {
        // Add a new solar system to the existing data
        // Make sure it doesn't already exist!
        console.log(solarSystemId)
        console.log(rawData)
        const foundIt = !!rawData.find(x => x.id == solarSystemId)

        if (!foundIt) {
            // Add it
            const newSolarSystem = {
                id: solarSystemId,
                name: solarSystemName,
                entities: [],
                totalWeight: 0
            }
            rawData.push(newSolarSystem)
            return newSolarSystem
        }
        return {"Error": "Entered solar system Id already exists"}
    },
    addPlanet(solarSystemId, planetData, rawData) {
        // Add a new planet to specified solar system
        console.log(solarSystemId)
        console.log(planetData)
        // Check the solar system exists
        const foundIt = !!rawData.find(x => x.id == solarSystemId)
        console.log(`FountIt: ${foundIt}`)
        if (foundIt) {
            // Solar system match - check planet doesn't already exist
            console.log('Inside foundIt')

            let errorText = ''
            rawData.forEach((ss) => {
                if (ss.id == solarSystemId) {
                    // Match on solar system
                    // Does planet already exist?
                    const foundPlanet = !!ss.entities.find(x => x.id == planetData.id)
                    console.log(`foundPlanet: ${foundPlanet}`)

                    if (foundPlanet) {
                        errorText = "Planet with Id '" + planetData.id + "' already exists in solar system '" + solarSystemId + "'"
                    } else {
                        // Planet doesn't exist in this solar system - so add it
                        ss.entities.push(planetData)
                    }
                }
            })
            // End of loop
            if (errorText === '') {
                return ([true, planetData])
            } else {
                return ([false, errorText])
            }
        }
        return ([false, 'Solar system \'' + solarSystemId + '\' does not exist'])

    },
    deleteSolarSystem(solarSystemId, rawData) {
        // Delete specified solar system
        // Make sure it really exists
        const foundIt = !!rawData.find(x => x.id == solarSystemId)
        if (foundIt) {
            // Delete it
            let newRawData = []
            rawData.forEach((ss) => {
                if (ss.id != solarSystemId) {
                    // Add to new array 
                    newRawData.push(ss)
                }
            })
            // rawData = newRawData
            return ([true, newRawData, ])
        }
        return ([false, undefined])
    },
    deletePlanet(solarSystemId, planetId, rawData) {
        // Delete planet(s) from solar system
        let newData = []
         // Make sure solar system exists
         const foundIt = !!rawData.find(x => x.id == solarSystemId)
         if (foundIt) {
             // Loop through solar systems, storing data
             rawData.forEach((ss) => {
                if (ss.id == solarSystemId) {
                    // Match
                    if (planetId) {
                        // Delete specified planet from this solar system

                    } else {
                        // Delete all planets in this solar system
                        let copySolarSystem = Object.assign({}, ss)
                        delete copySolarSystem.entities
                        newData.push(copySolarSystem)
                    }
                } else {
                    // Just store data
                    newData.push(ss)
                }
             })
             return ([true, newData])

         } else {
             return ([false, "Solar System '" + solarSystemId + "' does not exist"])
         }

    },
    updateSolarSystem(solarSystemId, solarSystemName, rawData) {
        // Updates name of solar system
        const foundIt = !!rawData.find(x => x.id == solarSystemId)
        if (foundIt) {
            // Update it
            let updatedRawData = []
            let updatedObject = {}
            rawData.forEach((ss) => {
                if (ss.id == solarSystemId) {
                    // Match - update it and add to array and object
                    console.log(`Adding: ${ss.id}`)
                    ss.name = solarSystemName
                    ss.totalWeight = calculateTotalWeight(ss.entities)
                    updatedRawData.push(ss)
                    updatedObject = Object.assign({}, ss)
                } else {
                    // Add to new array
                    updatedRawData.push(ss)
                }
            })
            return ([true, updatedRawData, updatedObject])
        } else {
            // Solar system not on record
            return ([false, undefined, undefined])
        }
    },
    getSolarSystemWeight(solarSystemId, rawData) {
        // Return the id, name and weight of the solar system
        // Make sure it exists
        const foundIt = !!rawData.find(x => x.id == solarSystemId)
        if (foundIt) {
            let updatedObject = {}
            // Calculate weight
            rawData.forEach((ss) => {
                if (ss.id == solarSystemId) {
                    // Match
                    updatedObject = Object.assign({}, ss)
                    console.log(`Calculating: ${updatedObject.id}`)
                    updatedObject.totalWeight = calculateTotalWeight(updatedObject.entities)
                    delete updatedObject.entities
                }
            })
            return([true, updatedObject])
        } else {
            return ([false, undefined])
        }

    },
    getPlanets(solarSystemId, planetId, rawData) {
        // Return a list of planet(s), depending on parameter 2
        // Make sure the solar system exists
        const foundIt = !!rawData.find(x => x.id == solarSystemId)
        let errorText = ''
        if (foundIt) {
            let returnObject = []
            rawData.forEach((ss) => {
                if (ss.id == solarSystemId) {
                    // Match - store planet info - if any
                    if (ss.entities) {
                        ss.entities.forEach((entity) => {
                            if (entity.type === "planet" && (planetId === '' || planetId == entity.id)) {
                                returnObject.push(entity)
                            }
                        })
                    } else {
                        errorText = "There are no planets in solar system '" + solarSystemId + "'"
                    }
                    if (returnObject.length === 0 && !errorText) {
                        errorText = "Planet '" + planetId + "' does not exist in solar system '" + solarSystemId + "'"
                    }
                }
            })
            return ([!errorText, errorText || returnObject])
        } else {
            return ([false, "Solar system '" + solarSystemId + "' does not exist"])
        }

    }
    
}

// myArray = [{'id':'73','foo':'bar'},{'id':'45','foo':'bar'}, etc.]
// myArray.find(x => x.id === '45').foo;

function calculateTotalWeight(entities) {
    // Total all entities in this solar system
    // First check there ar some
    console.log(`entities: ${entities}`)
    let totalWeight = 0
    if (entities) {

        console.log(entities.length)
    
        entities.forEach((entity) => {
            totalWeight += entity.weight
        })
    }

    return totalWeight
    
}
