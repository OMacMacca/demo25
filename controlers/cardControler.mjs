import express from 'express'
import {decks, addToDecks, chengeDecks} from '../server.mjs'
import baseAuth from '../modules/basicAuthentication.mjs';

const cardRouter = express.Router()

import ItemStore from '../Data/deckRecordStore.mjs';
const storageHandler = new ItemStore();

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


function card(suit, value){
    return {suit, value}
}

// gets a random card from a given deck
cardRouter.get('/:deckid/getRandom', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.deckid)

        let wantedDeck = storageHandler.read(id)
        
        let wantedCard = wantedDeck.deck[Math.floor(Math.random() * wantedDeck.deck.length)]

        wantedCard = JSON.stringify(wantedCard)

        res.send(wantedCard)
    }else{
        res.send("error")
    }})

// adds a random card
cardRouter.post('/:deckid/addRandom', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.deckid)

        let wantedDeck = storageHandler.read(id)

        //console.log(wantedDeck)

        let ranSuit = suits[Math.floor(Math.random()*suits.length)]
        let ranValue = values[Math.floor(Math.random()*values.length)]

        let newCard = card(ranSuit, ranValue)

        wantedDeck.deck.push(newCard)

        storageHandler.update(wantedDeck)

        res.send(wantedDeck)
    }else{
        res.send("error")
    }
})

// deletes a random card
cardRouter.delete('/:deckid/deleteRandom', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.deckid)

        let wantedDeck = storageHandler.read(id)


        wantedDeck.deck.splice(Math.floor(Math.random() * wantedDeck.deck.length), 1)

        let updatedDeck = storageHandler.update(wantedDeck)
        
        res.send(updatedDeck)
    }else{
        res.send("error")
    }
})

export default cardRouter