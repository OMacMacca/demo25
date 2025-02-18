import express from 'express'
import baseAuth from '../modules/basicAuthentication.mjs';

const router = express.Router()


//----variables-----------------------------
let suits = [
    "Spades",
    "Clubs",
    "Hearts",
    "Diamonds"
]
let values = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King"
]

let standardDeck = makeDeck()

let credetials = {
    username: "alex",
    password: "haven8"
}

//----help functions

function makeDeck(){
    let standardDeck = []
    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < values.length; j++){
            standardDeck.push(card(suits[i], values[j]))
        }
    }

    return standardDeck
}

function card(suit, value){
    return {suit, value}
}

function uniqueCode(){
    let code = Math.floor(Math.random()*9999)
    return code
}

function findDeck(id){
    for(let i = 0; i < process.env.decks.length; i++){
        if(process.env.decks[i].id == id){
            return process.env.decks[i]
        }
    }
    return null
}

const shuffle = (aArray) => { 
    return aArray.sort(() => Math.random() - 0.5); 
}; 


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
            for(let i = 0; i < process.env.decks.length; i++){
                let testDeck = process.env.decks[i]
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

        let decks = process.env.decks

        decks = decks.filter(decks => decks.id != id)

        decks.push(deckToShuffle)

        let deckString = JSON.stringify(decks)

        process.env.decks = decks

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