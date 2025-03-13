import express, { response } from 'express'
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

        let deckReader = storageHandler.read(id)
        .then((promise) => {
            let wantedCard = promise.deck[Math.floor(Math.random() * promise.deck.length)]

            wantedCard = JSON.stringify(wantedCard)
    
            res.send(wantedCard)
        })     
 
    }else{
        res.send("error")
    }})

// adds a random card
cardRouter.post('/:deckid/addRandom', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.deckid)

        let deckReader = storageHandler.read(id)
        .then((promise) => {
            let ranSuit = suits[Math.floor(Math.random()*suits.length)]
            let ranValue = values[Math.floor(Math.random()*values.length)]
    
            let newCard = card(ranSuit, ranValue)
    
            promise.deck.push(newCard)
    
            storageHandler.update(wantedDeck)
            .then((response) => {
                res.send(response)
            })
        })
    }else{
        res.send("error")
    }
})

// deletes a random card
cardRouter.delete('/:deckid/deleteRandom', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.deckid)

        let wantedDeck = storageHandler.read(id)
        .then((promise) => {

            promise.deck.splice(Math.floor(Math.random() * promise.deck.length), 1)

            storageHandler.update(promise)
            .then((promise) => {
                res.send(promise)
            })
        })

    }else{
        res.send("error")
    }
})

export default cardRouter