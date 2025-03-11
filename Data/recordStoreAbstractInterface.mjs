import DbManager from "./db.mjs";

function RecordStoreAbstractInterface() {
    return { 
        create(item) {
            console.log("object put in: " + item)
            DbManager.create(`INSERT INTO "public"."decks"("id", "deck") VALUES($1, $2) RETURNING "id", "deck";`, item)
        },
        read(item) {
            DbManager.read(`SELECT * FROM "decks" WHERE "id" = $1 RETURNING "id", "deck"`, item.id)
        },
        /*readAllIds() {
            DbManager.read(`SELECT * FROM "decks" WHERE "id" = $1 RETURNING "id", "deck"`, item.id)
        },*/
        update(item) {
            DbManager.update(`UPDATE "public"."decks" SET "deck" = $2 WHERE "id" = $1 RETURNING "id", "deck";`, item)
        },
        purge(item) {
            DbManager.delete(`DELETE FROM decks WHERE "id" = $1 RETURNING "id", "deck"`, item.id)
        }
    }
}

export default RecordStoreAbstractInterface