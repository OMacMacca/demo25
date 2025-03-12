import { objectToCSV} from "./ObjToCsv.mjs";
import { CSVtoObject } from "./CsvToObj.mjs";

function card(suit, value){
    return {suit, value}
}

var theDeck = [
    card("Clubs", "Five"),
    card("Spades", "Five"),
    card("Hearts", "Four"),
]

console.log(theDeck)

let CSVDeck = objectToCSV(theDeck)

let OBJDeck = CSVtoObject(CSVDeck)

console.log(OBJDeck)