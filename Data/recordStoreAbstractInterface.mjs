import DbManager from "./db.mjs";
import { objectToCSV } from "./csvHandlers/ObjToCsv.mjs";
import { CSVtoObject } from "./csvHandlers/CsvToObj.mjs";

function RecordStoreAbstractInterface() {
    return { 
        create(item) {/*throw Error("Not Implemented")*/},
        async read(id) {
            let fromDB = await DbManager.read(`SELECT * FROM "decks" WHERE "id" = $1`, id)
            console.log("before convestions: " + fromDB)
            fromDB = CSVtoObject(fromDB)
            console.log("in abstract: "+fromDB)
            return fromDB 
        },
        readAllIds() {/*throw Error("Not Implemented")*/},
        update(item) {/*throw Error("Not Implemented")*/},
        purge(id) {/*throw Error("Not Implemented")*/}
    }
}





export default RecordStoreAbstractInterface