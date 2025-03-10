import recordStoreAbstractInterface from "./recordStoreAbstractInterfact.mjs";
import DbManager from "./db.mjs";

class ItemStore extends recordStoreAbstractInterface {

    create(item) {
        DbManager.create(`INSERT INTO "public"."decks"("id", "deck") VALUES($1, $2) RETURNING "id", "deck";`, item)
    }

    update(item) {
        DbManager.create(`UPDATE "public"."decks" SET "deck" = $2 WHERE "id" = $1 RETURNING "id", "deck";`, item)
    }

    read(id) {
        DbManager.create(`SELECT * FROM "decks" WHERE "id" = $1 RETURNING "id", "deck"`, id)
    }

    readAllIds() {
        DbManager.create(`SELECT * FROM "decks" RETURNING "id"`)
    }

    purge(id) {
        DbManager.create(`DELETE FROM decks WHERE "id" = $1 RETURNING "id", "deck"`, id)
    }
}

export default ItemStore