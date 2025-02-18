import express from 'express'
const router = express.Router()

// gets a certain deck
router.get('/:id', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.id)

        let wantedDeck = findDeck(id)
        
        wantedDeck = JSON.stringify(wantedDeck)

        res.status(HTTP_CODES.SUCCESS.OK).send(wantedDeck)
    }else{
        res.status(HTTP_CODES.CLIENT_ERROR)
    }
})

// created a new deck
router.post('/', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id
        let alreadyExists = false
        do{
            alreadyExists = false
            id = uniqueCode()
            for(let i = 0; i < decks.length; i++){
                let testDeck = decks[i]
                if(testDeck.id == id){
                    alreadyExists = true
                    break
                }
            }
        }while(alreadyExists == true)
        
        let newDeck = standardDeck
    
        let DeckObj = {
            "id": id,
            "deck": newDeck
        }
    
        decks.push(DeckObj)
    
        let found = findDeck(id)
    
        let someText = found.id
    
        res.status(HTTP_CODES.SUCCESS.OK).send(someText + "")
    }else{
        res.status(HTTP_CODES.CLIENT_ERROR)
    }})
// shuffles

router.put('/shuffle/:id', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.id)

        let deckToShuffle = findDeck(id)

        let shuffled = shuffle(deckToShuffle.deck)

        deckToShuffle.deck = shuffled

        decks = decks.filter(decks => decks.id != id)

        decks.push(deckToShuffle)

        let deckString = JSON.stringify(decks)

        console.log("am shuffle")

        res.status(HTTP_CODES.SUCCESS.OK).send("Shuffled")
    }else{
        res.status(HTTP_CODES.CLIENT_ERROR)
    }})

// Deletes a given Deck
router.get('/delete/:id', baseAuth(credetials), (req, res) => {
    res.send('About birds')
})

module.exports = router