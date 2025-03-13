import DbManager from "./db.mjs";
import { objectToCSV } from "./csvHandlers/ObjToCsv.mjs";
import { CSVtoObject } from "./csvHandlers/CsvToObj.mjs";

function RecordStoreAbstractInterface() {
    return { 
        create(item) {/*throw Error("Not Implemented")*/},
        async read(id) {
            try {
                let fromDB = await DbManager.read(`SELECT * FROM "decks" WHERE "id" = $1`, id)
                console.log(fromDB)
                fromDB = await CSVtoObject(fromDB)
                console.log(fromDB)
                return fromDB
            } catch (error) {
                console.log(error)
            }      
        },
        readAllIds() {/*throw Error("Not Implemented")*/},
        update(item) {/*throw Error("Not Implemented")*/},
        purge(id) {/*throw Error("Not Implemented")*/}
    }
}





export default RecordStoreAbstractInterface