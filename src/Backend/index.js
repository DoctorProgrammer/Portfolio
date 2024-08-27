/*
  VERSION:              Robin Trachsel
  DATE:                 19.08.2024
  DESCRIPTION:          JS-Server for the backend

  Allowed URLs:
  - https://robintrachsel.ch
  - https://localhost:3000
*/

const express = require('express')
const cors = require('cors')
const comment = require('./comment.js')
const document = require('./document.js')

const app = express()
const host = '127.0.0.1'
const port = 3000

// Define a whitelist of allowed origins
const whitelist = [
    'https://www.robintrachsel.ch', 
    'https://robintrachsel.ch', 
    'http://127.0.0.1:5500', 
    'http://localhost:5500', 
    'http://localhost:3000'
]

// Access-Control-Allow-Origin
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
    methods: 'GET, POST, DELETE',
    allowedHeaders: 'Content-Type',
    credentials: true,
    preflightContinue: false
}

// Apply middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(log)

// Define routes
app.use('/comment', comment)
app.use('/document', document)

app.options('*', cors())

// Catch-all route for undefined endpoints
app.get('*', (req, res) => {
    res.status(404).send({ error: 'Endpoint not found' })
})

// Start the server
app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`)
})

// Logging middleware
function log(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
}

// Export CORS options for potential testing or external use
module.exports = [
    corsOptions
]
