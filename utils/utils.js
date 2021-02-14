const { forEach } = require("../data")
const rawData = require("../data")

module.exports = { 
    getSolarSystems(solarSystem) {
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
