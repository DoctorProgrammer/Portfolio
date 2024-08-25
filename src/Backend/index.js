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

const whitelist = ['https://www.robintrachsel.ch', 'http://127.0.0.1:5500', 'https://hoppscotch.io/, https://localhost:5500']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            console.log(`Blocked request from ${origin}`)
        }
    }
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))
app.use(log)

app.use('/comment', comment)
app.use('/document', document)

app.get('*', (req, res) => {
    res.status(404).send({ error: 'Endpoint not found' })
})

app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`)
})

function log(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
}

module.exports = [
    corsOptions
]