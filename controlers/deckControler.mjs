import express, { response } from 'express'
import {decks, addToDecks, chengeDecks} from '../server.mjs'
import baseAuth from '../modules/basicAuthentication.mjs';

const deckRouter = express.Router()

import ItemStore from '../Data/deckRecordStore.mjs';
const storageHandler = new ItemStore();


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
    let tempDeck = decks
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

        let deckChecker = storageHandler.read(id)
        .then((promise) => {
            let wantedDeck = JSON.stringify(promise.deck)

            res.send(wantedDeck)
        })

    }else{
        res.send("error")
    }
})

// created a new deck
deckRouter.post('/', baseAuth(credetials), async (req, res) => {

    if(req.loggedIn){
        var idChecker = storageHandler.readAllIds()
        .then((allIds) => {
            let id
            let alreadyExists = false
            if(allIds != null){
                do{
                    alreadyExists = false
                    id = uniqueCode()
                    for(let i = 0; i < allIds.length; i++){
                        let testDeck = allIds[i]
                        if(testDeck.id == id){
                            alreadyExists = true
                            break
                        }
                    }
                }while(alreadyExists == true)
            }
            let newDeck = standardDeck

            id = uniqueCode()
            let DeckObj = {
                "id": id,
                "deck": newDeck
            }
        
            const item = storageHandler.create(DeckObj)
            .then((promise) => {
                let wantedDeck = JSON.stringify(promise)
    
                res.send(wantedDeck)
            })
        })
    }else{
        res.send("error")
    }})
// shuffles

deckRouter.patch('/shuffle/:id', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.id)


        let deckReader = storageHandler.read(id)
        .then((promise) => {
            let deckToShuffle = promise

            let shuffled = shuffle(promise.deck)

            deckToShuffle.deck = shuffled

            let updater = storageHandler.update(deckToShuffle)
            .then((resault) => {

                resault = JSON.stringify(resault)

                res.send(resault)
            })

        })

    }else{
        res.send("error")
    }})

// Deletes a given Deck
deckRouter.delete('/delete/:id', baseAuth(credetials), (req, res) => {
    if(req.loggedIn){
        let id = Number(req.params.id)
        let deleter = storageHandler.purge(id)
        .then((resault) => {
            res.send(resault)
        })
    }else{
        res.send("error")
    }
})

export default deckRouter