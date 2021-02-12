const rawData = require("../data")

module.exports = { 
    getSolarSystems(solarSystem) {
        let returnData = []

        console.log(rawData)
        console.log(rawData[1])
        console.log(solarSystem)
        console.log(typeof solarSystem)

        if (solarSystem === '') {
            return rawData;
        }
        if (solarSystem === '1') {
            console.log(1111111111111)
            returnData.push(rawData[1])
            return returnData
        }
    }
}
