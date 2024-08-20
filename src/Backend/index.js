/*
  VERSION:              Robin Trachsel
  DATE:                 19.08.2024
  DESCRIPTION:          JS-Server for the backend

  Allowed URLs:
  - https://robintrachsel.ch
  - https://localhost:3000
*/

const express = require('express')
const comment = require('./comment.js')
const document = require('./document.js')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(log)
app.use(checkOrigin)

app.use('/comment', comment)
app.use('/document', document)

app.get('*', (req, res) => {
    res.status(404).send({ error: 'Endpoint not found' })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function log(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
}

function checkOrigin(req, res, next) {
    const allowedOrigins = ['robintrachsel.ch', 'localhost:3000']
    const origin = req.get('origin') || req.get('referer') || req.get('host');

    if (allowedOrigins.includes(origin)) {
        next();
    } else {
        res.status(403).json({ error: 'Origin not allowed' });
    }
}