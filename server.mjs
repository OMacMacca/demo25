import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';
import baseAuth from './modules/basicAuthentication.mjs';
import deckRouter from './controlers/deckControler.mjs'
import cardRouter from './controlers/cardControler.mjs'

const server = express();
const port = (process.env.PORT || 8000);


server.set('port', port);
server.use(express.static('public'));

//----uke 2----------------------------
function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();

}
server.get("/", getRoot);


//----uke 3----------------------------


let poem = "First they came for the Communists And I did not speak out Because I was not a Communist"
let quotes = [
    "I tell you ladies, you dont know how much joy you will have until you begin to smash, smash, smash! -Carry Nation",
    "First get your facts straight, Then distort them at your leasure -Mark Twain",
    "Dogs look up to us. Cats look down on us. Pigs treat us as equals -Winston Churchill"
]

function getPoem(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send(poem)
}
server.get("/temp/poem", getPoem)

function getQuote(req, res, next) {
    let quoteNumber = Math.floor(Math.random() * quotes.length)
    let aQuote = quotes[quoteNumber]

    res.status(HTTP_CODES.SUCCESS.OK).send(aQuote)
}
server.get("/temp/quote", getQuote)


function postSum(req, res, next) {
    let a = Number(req.params.a)
    let b = Number(req.params.b)
    let sum = a + b
    let sumText = sum.toString()

    res.status(HTTP_CODES.SUCCESS.OK).send(sumText)
    
    //nvm fikset
}
server.post("/temp/sum/:a/:b", postSum)


//----uke 4-------------------------------
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

function makeDeck(){
    let standardDeck = []
    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < values.length; j++){
            standardDeck.push(card(suits[i], values[j]))
        }
    }

    return standardDeck
}

let standardDeck = makeDeck()

function card(suit, value){
    return {suit, value}
}

export let decks = []

export function addToDecks(aDeck){
    decks.push(aDeck)
}
export function chengeDecks(aDecks){
    decks = aDecks
}

let credetials = {
    username: "alex",
    password: "haven8"
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

function postDeck(req, res, next) {
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
    }

}
server.post("/temp/deck", baseAuth(credetials), postDeck)

function patchShuffle(req, res, next) {
    if(req.loggedIn){
        let decks = process.env.decks
        let id = Number(req.params.id)

        let deckToShuffle = findDeck(id)

        let shuffled = shuffle(deckToShuffle.deck)

        deckToShuffle.deck = shuffled

        decks = decks.filter(decks => decks.id != id)

        decks.push(deckToShuffle)

        let deckString = JSON.stringify(decks)

        process.env.decks = decks

        console.log("am shuffle")

        res.status(HTTP_CODES.SUCCESS.OK).send("Shuffled")
    }else{
        res.status(HTTP_CODES.CLIENT_ERROR)
    }
    
}
server.patch("/temp/deck/shuffle/:id", baseAuth(credetials), patchShuffle)

function getDeck(req, res, next) {
    if(req.loggedIn){
        let id = Number(req.params.id)

        let wantedDeck = findDeck(id)
        
        wantedDeck = JSON.stringify(wantedDeck)

        res.status(HTTP_CODES.SUCCESS.OK).send(wantedDeck)
    }else{
        res.status(HTTP_CODES.CLIENT_ERROR)
    }
}
server.get("/temp/deck/:id", baseAuth(credetials), getDeck)

function getCard(req, res, next) {
    if(req.loggedIn){
        let id = Number(req.params.id)

        let wantedDeck = findDeck(id)
        
        let wantedCard = wantedDeck.deck[Math.floor(Math.random() * wantedDeck.deck.length)]

        wantedCard = JSON.stringify(wantedCard)

        res.status(HTTP_CODES.SUCCESS.OK).send(wantedCard)
    }else{
        res.status(HTTP_CODES.CLIENT_ERROR)
    }
    
}
server.get("/temp/deck/:id/card", baseAuth(credetials), getCard)

//----uke 8--------------------------------


server.use('/deck', deckRouter)
server.use('/card', cardRouter)


//----port thing---------------------------

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});