import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

const server = express();
const port = (process.env.PORT || 8000);

let poem = "First they came for the Communists And I did not speak out Because I was not a Communist"
let quotes = [
    "I tell you ladies, you dont know how much joy you will have until you begin to smash, smash, smash! -Carry Nation",
    "First get your facts straight, Then distort them at your leasure -Mark Twain",
    "Dogs look up to us. Cats look down on us. Pigs treat us as equals -Winston Churchill"
]

server.set('port', port);
server.use(express.static('public'));

function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();

}
server.get("/", getRoot);


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

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});