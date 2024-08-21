/*
  VERSION:              Robin Trachsel
  DATE:                 19.08.2024
  DESCRIPTION:          File to handle the comments
*/

const express = require('express')
const router = express.Router()

const comments = []

router.get('', (req, res) => {
    res.json(comments)
})

router.post('', (req, res) => {
    const comment = req.body
    const id = createId()
    const prename = comment.prename
    const name = comment.name
    const author = prename + ' ' + name
    const initials = prename.charAt(0) + name.charAt(0)


    const newComment = {
        id: id,
        reference: comment.reference,
        author: author,
        initials: initials,
        content: comment.content
    }

    comments.push(newComment)
    res.json(comments)
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const comment = comments.find(comment => comment.id === id)

    if (comment) {
        res.json(comment)
    } else {
        res.status(404).send({ error: 'Comment not found' })
    }
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = comments.findIndex(comment => comment.id === id)

    if (index === -1) {
        res.status(404).send({ error: 'Comment not found' })
    } else {
        comments.splice(index, 1)
        res.status(204).send()
    }
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const comment = comments.find(comment => comment.id === id)

    if (comment) {
        comment.content = req.body.content
        comment.reference = req.body.reference
        comment.author = req.body.author
        comment.initials = req.body.initials

        res.json(comment)
    } else {
        res.status(404).send({ error: 'Comment not found' })
    }
})

function createId() {
    const lastComment = comments[comments.length - 1]
    if (!lastComment) {
        return 1
    }
    return lastComment.id + 1
}

module.exports = [
    router
]