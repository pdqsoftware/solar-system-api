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
                    ss.totalWeight = calculateTotalWeight(updatedObject.entities)
                    delete updatedObject.entities
                }
            })
            return([true, updatedObject])
        } else {
            return ([false, undefined])
        }

    }
    
}

// myArray = [{'id':'73','foo':'bar'},{'id':'45','foo':'bar'}, etc.]
// myArray.find(x => x.id === '45').foo;

function calculateTotalWeight(entities) {
    // Total all entities in this solar system

    console.log(entities.length)
    let totalWeight = 0
    entities.forEach((entity) => {
        totalWeight += entity.weight
    })

    return totalWeight
    
}
