import express from 'express'
import {decks, addToDecks, chengeDecks} from '../server.mjs'
import baseAuth from '../modules/basicAuthentication.mjs';

const deckRouter = express.Router()


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
    for(let i = 0; i < decks.length; i++){
        if(decks[i].id == id){
            return decks[i]
        }
    }
    return null
}

function deleteDeck(id){
    tempDeck = decks
    for(let i = 0; i < tempDeck.length; i++){
        if(tempDeck[i].id == id){
            tempDeck.splice(i, 1);
            chengeDecks(tempDeck)
            return ("success")
        }
    }
    return null
}

const shuffle = (aArray) => { 
    return aArray.sort(() => Math.random() - 0.5); 
}; 

// gets a certain deck
deckRouter.get('/:id', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.id)

        let wantedDeck = findDeck(id)
        
        wantedDeck = JSON.stringify(wantedDeck)

        res.send(wantedDeck)
    }else{
        res.send("error")
    }
})

// created a new deck
deckRouter.post('/', baseAuth(credetials), (req, res) => {
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
    
        res.send(someText + "")
    }else{
        res.send("error")
    }})
// shuffles

deckRouter.patch('/shuffle/:id', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        console.log("check")
        let id = Number(req.params.id)

        let deckToShuffle = findDeck(id)

        let shuffled = shuffle(deckToShuffle.deck)

        deckToShuffle.deck = shuffled

        chengeDecks(decks.filter(decks => decks.id != id)) 

        addToDecks(deckToShuffle)

        let deckString = JSON.stringify(decks)

        console.log("am shuffle")

        res.send("Shuffled")
    }else{
        res.send("error")
    }})

// Deletes a given Deck
deckRouter.delete('/delete/:id', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.id)

        let deckToDelete = deleteDeck(id)
        if(deckToDelete != null){
            res.send(deckToDelete)
        }else{
            res.send("Nothing was Deleted")
        }
    }else{
        res.send("error")
    }
})

export default deckRouter