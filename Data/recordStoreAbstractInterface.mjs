import DbManager from "./db.mjs";
import { objectToCSV } from "./csvHandlers/ObjToCsv.mjs";
import { CSVtoObject } from "./csvHandlers/CsvToObj.mjs";

function RecordStoreAbstractInterface() {
    return { 
        create(item) {
            item.deck = objectToCSV(item.deck)
            let fromDB = DbManager.create(`INSERT INTO "public"."decks"("id", "deck") VALUES($1, $2) RETURNING "id", "deck";`, item.id, item.deck)
            .then((promise) => {
                promise.deck = promise.deck.replace(/\r/g, '')
                promise.deck = CSVtoObject(promise.deck)
                return promise
            })
            return fromDB
        },
        read(id) {
            let fromDB =  DbManager.read(`SELECT * FROM "decks" WHERE "id" = $1`, id)
            .then((promise) => {
                promise.deck = promise.deck.replace(/\r/g, '')
                promise.deck = CSVtoObject(promise.deck)
                return promise
            })
            return fromDB 
        },
        readAllIds() {
            let fromDB = DbManager.readAllIds(`SELECT "id" FROM "decks"`)
            .then((promise) => {
                return promise
            })
            return fromDB
        },
        update(item) {            
            item.deck = objectToCSV(item.deck)
            let fromDB = DbManager.create(`UPDATE "public"."decks" SET "deck" = $2 WHERE "id" = $1 RETURNING "id", "deck";`, item.id, item.deck)
            .then((promise) => {
                promise.deck = promise.deck.replace(/\r/g, '')
                promise.deck = CSVtoObject(promise.deck)
                return promise
            })
            return fromDB
        },
        purge(id) {
            let fromDB = DbManager.purge(`DELETE FROM decks WHERE "id" = $1 RETURNING "id", "deck"`, id)
            .then((promise) => {
                promise.deck = CSVtoObject(promise.deck)
                return promise
            })
            return fromDB
        }
    }
}





export default RecordStoreAbstractInterface