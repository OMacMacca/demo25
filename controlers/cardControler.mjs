import express from 'express'
import {decks} from '../server.mjs'
import baseAuth from '../modules/basicAuthentication.mjs';

const cardRouter = express.Router()

//----variables------------------------------------
let credetials = {
    username: "alex",
    password: "haven8"
}

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
//----help functions-------------------------------

function findDeck(id){
    for(let i = 0; i < decks.length; i++){
        if(decks[i].id == id){
            return decks[i]
        }
    }
    return null
}

function card(suit, value){
    return {suit, value}
}

// gets a random card from a given deck
cardRouter.get('/:deckid/getRandom', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.deckid)

        let wantedDeck = findDeck(id)
        
        let wantedCard = wantedDeck.deck[Math.floor(Math.random() * wantedDeck.deck.length)]

        wantedCard = JSON.stringify(wantedCard)

        res.status(HTTP_CODES.SUCCESS.OK).send(wantedCard)
    }else{
        res.status(HTTP_CODES.CLIENT_ERROR)
    }})

// adds a random card
cardRouter.post('/:deckid/addRandom', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.deckid)

        let wantedDeck = findDeck(id)



        var ranSuit = suits[Math.floor(Math.random()*suits.length)]
        var ranValue = values[Math.floor(Math.random()*values.length)]

        newCard = card(ranSuit, ranValue)

        wantedDeck.push(newCard)

        res.status(HTTP_CODES.SUCCESS.OK).send(wantedDeck)
    }else{
        res.status(HTTP_CODES.CLIENT_ERROR)
    }
})

// deletes a random card
cardRouter.get('/:deckid/deleteRandom', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.deckid)

        let wantedDeck = findDeck(id)


        wantedDeck.splice(Math.floor(Math.random() * wantedDeck.length, 1))

        res.status(HTTP_CODES.SUCCESS.OK).send(wantedDeck)
    }else{
        res.status(HTTP_CODES.CLIENT_ERROR)
    }
})

export default cardRouter