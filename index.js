const express = require('express')
// const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Import the Solar System router file
const solarSystemRouter = require('./routes/solarSystemRouter')

const hostname = 'localhost'
const port = process.env.PORT || 3030

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())

// let rawData = require('./data');

// Tell app to use solarSystemRouter when processing calls requesting /solarSystem
// So all of the app functions below can be removed and placed inside dishRouter.js
app.use('/solarSystem', solarSystemRouter)

// Static files come from the root directory + /public
app.use(express.static(__dirname + '/public'))

// next (which is optional) is used to handle the use of middleware inside the Express framework
app.use((req, res, next) => {
    // console.log(req.headers)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>You have entered an incorrect request!</h1></body></html>')
})


// Using Express has the added advantage of not requiring the http module
app.listen(port, hostname, () => {
    console.log(`Solar System API server running at http://${hostname}:${port}`)
})