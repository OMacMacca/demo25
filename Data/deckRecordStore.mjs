import RecordStoreAbstractInterface from "./recordStoreAbstractInterface.mjs";
import DbManager from "./db.mjs";
import { objectToCSV } from "./csvHandlers/ObjToCsv.mjs";
import { CSVtoObject } from "./csvHandlers/CsvToObj.mjs";


class ItemStore extends RecordStoreAbstractInterface {
    create(item) {
        console.log("object put in: " + item)
        item.deck = objectToCSV(item.deck)
        return DbManager.create(`INSERT INTO "public"."decks"("id", "deck") VALUES($1, $2) RETURNING "id", "deck";`, item)
    }

    update(item) {
        item.deck = objectToCSV(item.deck)
        return DbManager.update(`UPDATE "public"."decks" SET "deck" = $2 WHERE "id" = $1 RETURNING "id", "deck";`, item)
    }

    read(id) {
        let fromDB = DbManager.read(`SELECT * FROM "decks" WHERE "id" = $1 RETURNING "id", "deck"`, id)
        fromDB.deck = CSVtoObject(fromDB.deck)
        return fromDB
    }

    readAllIds() {
        return DbManager.readAllIds(`SELECT * FROM "decks" RETURNING "id"`)
    }

    purge(id) {
        return DbManager.delete(`DELETE FROM decks WHERE "id" = $1 RETURNING "id", "deck"`, id)
    }
}

export default ItemStore