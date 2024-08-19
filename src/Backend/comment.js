/*
  VERSION:              Robin Trachsel
  DATE:                 19.08.2024
  DESCRIPTION:          File to handle the comments
*/

const express = require('express')
const router = express.Router()

const comments = [
    {
        id: 1,
        reference: "Vorgesetzter",
        author: 'Robin Trachsel',
        title: 'Title 1',
        content: 'Content 1'
    }
]

router.get('', (req, res) => {
    res.json(comments)
})

router.post('', (req, res) => {
    const comment = req.body
    const id = createId()
    const reference = comment.reference
    const author = comment.author
    const title = comment.title
    const content = comment.content

    const newComment = {
        id: id,
        reference: reference,
        author: author,
        title: title,
        content: content
    }

    comments.push(newComment)
    res.json(newComment)
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
        comment.reference = req.body.reference
        comment.author = req.body.author
        comment.title = req.body.title
        comment.content = req.body.content

        res.json(comment)
    } else {
        res.status(404).send({ error: 'Comment not found' })
    }
})

function createId() {
    const lastComment = comments[comments.length - 1]
    return lastComment.id + 1
}