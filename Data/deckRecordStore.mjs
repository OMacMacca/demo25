import RecordStoreAbstractInterface from "./recordStoreAbstractInterface.mjs";
import DbManager from "./db.mjs";


class ItemStore extends RecordStoreAbstractInterface {
    create(item) {
        console.log("object put in: " + item)
        DbManager.create(`INSERT INTO "public"."decks"("id", "deck") VALUES($1, $2) RETURNING "id", "deck";`, item)
    }

    update(item) {
        DbManager.update(`UPDATE "public"."decks" SET "deck" = $2 WHERE "id" = $1 RETURNING "id", "deck";`, item)
    }

    read(item) {
        DbManager.read(`SELECT * FROM "decks" WHERE "id" = $1 RETURNING "id", "deck"`, item.id)
    }

    /*readAllIds() {
        DbManager.readAllIds(`SELECT * FROM "decks" RETURNING "id"`)
    }*/

    purge(item) {
        DbManager.delete(`DELETE FROM decks WHERE "id" = $1 RETURNING "id", "deck"`, item.id)
    }
}

export default ItemStore