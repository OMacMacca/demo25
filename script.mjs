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


function postSum(req, res, next) {
    let a = Number(req.params.a)
    let b = Number(req.params.b)
    let sum = a + b
    let sumText = sum.toString()

    res.status(HTTP_CODES.SUCCESS.OK).send(sumText)
    
    //du leger kansje merke til at denne koden heter "postSum", men bruker server.get
    //ifølge oppgavebeskrivelsen så skal denne oppgaven utnytte post() metoden
    //men jeg kan ikke klare å få det til
    //om jeg bare prøver å bruke linken http://localhost:8000/temp/sum/a/b så prøver den å GETe linken.
    //jeg prøvde å finne en måte å endre det sånn at linken gjør en POST komando ikke en GET
    //men jeg kunne ikke finne nokk om å lage en link som blir til en post (uten å lage et eget klient script med formdata)
    //det jeg fant ville at jeg skulle endre linken til noe som ligner på http://localhost:8000/temp/sum?method="post"a="25"/b="5"
    //men det ga ingen mening, siden oppgaven sier at jeg må bruke /tmp/sum/a/b som Route. 
    //derfor har jeg gjort denne koden om til en GET, siden det fungerte veldig bra.
    //om dette var en feil på oppgave teksten, og dette faktisk SKULLE være en en GET komando, så går det bra. slik skjer
    //om jeg faktisk skulle endre linken på et drastisk måte, så var ikke det veldig klart i dokumentasjonen
    //om jeg skule lage extra klient script, så var ikke det veldig klart i oppgaveteksten
    //(jeg prøvde å lage extra klientscript. se på postTest.html om du vil se hva jeg prøvde før jeg ga opp)
}
server.get("/temp/sum/:a/:b", postSum)


server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});