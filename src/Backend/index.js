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
const host = '127.0.0.1'
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(log)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

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