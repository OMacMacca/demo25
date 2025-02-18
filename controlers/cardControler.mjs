import express from 'express'
const router = express.Router()


// gets a random card from a given deck
router.get('/:deckid/getRandom', baseAuth(credetials), (req, res) => {
    res.send('Birds home page')
})

// adds a random card
router.post('/:deckid/addRandom', baseAuth(credetials), (req, res) => {
    res.send('Birds home page')
})

// deletes a random card
router.get('/:deckid/deleteRandom', baseAuth(credetials), (req, res) => {
    res.send('Birds home page')
})

module.exports = router