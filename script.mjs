import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

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

let decks = []

function uniqueCode(){
    let code = Math.floor(Math.random()*9999)
    return code
}

function findDeck(id){
    for(let i = 0; decks.length; i++){
        if(decks[i].id == id){
            return decks[i]
        }
        return null
    }
}

function postDeck(req, res, next) {
    console.log("postdeck started")
    let id
    let alreadyExists = false
    do{
        alreadyExists = false
        id = uniqueCode()
        for(let i = 0; decks.length; i++){
            let testDeck = decks[i]
            if(testDeck.id = id){
                alreadyExists = true
                break
            }
        }
    }while(alreadyExists == true)
    console.log("while loop finished")

    let newDeck = standardDeck

    let DeckObj = {
        "id": id,
        "deck": newDeck
    }

    decks.push(DeckObj)
    console.log("added deck")

    let found = findDeck(id)

    let someText = found.id + " " + found.deck
    console.log("found deck")

    res.status(HTTP_CODES.SUCCESS.OK).send(someText)
    console.log("should be finished")
}
server.post("/temp/deck", postDeck)

function patchShuffle(req, res, next) {
    let a = Number(req.params.a)
    let b = Number(req.params.b)
    let sum = a + b
    let sumText = sum.toString()

    res.status(HTTP_CODES.SUCCESS.OK).send(sumText)
    
}
server.post("/temp/deck/shuffle/:deck_id", patchShuffle)

function getDeck(req, res, next) {
    let a = Number(req.params.a)
    let b = Number(req.params.b)
    let sum = a + b
    let sumText = sum.toString()

    res.status(HTTP_CODES.SUCCESS.OK).send(sumText)
    
}
server.post("/temp/deck/:deck_id", getDeck)

function getCard(req, res, next) {
    let a = Number(req.params.a)
    let b = Number(req.params.b)
    let sum = a + b
    let sumText = sum.toString()

    res.status(HTTP_CODES.SUCCESS.OK).send(sumText)
    
}
server.post("/temp/deck/:deck_id/card", getCard)

//----port ting---------------------------
server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});