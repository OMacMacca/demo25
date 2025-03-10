import recordStoreAbstractInterface from "./recordStoreAbstractInterfact.mjs";
import DbManager from "./db.mjs";

class ItemStore extends recordStoreAbstractInterface {

    create(item) {
        DbManager.create(`INSERT INTO "public"."decks"("id", "deck") VALUES($1, $2) RETURNING "id", "deck";`, item)
    }

    update(item) {
        DbManager.update(`UPDATE "public"."decks" SET "deck" = $2 WHERE "id" = $1 RETURNING "id", "deck";`, item)
    }

    read(id) {
        DbManager.read(`SELECT * FROM "decks" WHERE "id" = $1 RETURNING "id", "deck"`, id)
    }

    readAllIds() {
        DbManager.readAllIds(`SELECT * FROM "decks" RETURNING "id"`)
    }

    purge(id) {
        DbManager.delete(`DELETE FROM decks WHERE "id" = $1 RETURNING "id", "deck"`, id)
    }
}

export default ItemStore