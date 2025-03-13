import DbManager from "./db.mjs";
import { objectToCSV } from "./csvHandlers/ObjToCsv.mjs";
import { CSVtoObject } from "./csvHandlers/CsvToObj.mjs";

function RecordStoreAbstractInterface() {
    return { 
        create(item) {/*throw Error("Not Implemented")*/},
        read(id) {
            let fromDB =  DbManager.read(`SELECT * FROM "decks" WHERE "id" = $1`, id)
            .then((promise) => {
                console.log("in the then statement before the convesrion:")
                console.log(promise)
                promise.deck = promise.deck.replace(/\r/g, '')
                promise.deck = CSVtoObject(promise.deck)
                console.log("in the then statement after the conversion:")
                console.log(promise)
                return promise
            })
            return fromDB 
        },
        readAllIds() {/*throw Error("Not Implemented")*/},
        update(item) {/*throw Error("Not Implemented")*/},
        purge(id) {/*throw Error("Not Implemented")*/}
    }
}





export default RecordStoreAbstractInterface