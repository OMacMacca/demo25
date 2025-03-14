import DbManager from "./db.mjs";
import { objectToCSV } from "./csvHandlers/ObjToCsv.mjs";
import { CSVtoObject } from "./csvHandlers/CsvToObj.mjs";


class RecordStoreAbstractInterface {
    create(item) {
        throw new Error("Method 'create' must be implemented.");
    }
    read(id) {
        throw new Error("Method 'read' must be implemented.");
    }
    update(item) {
        throw new Error("Method 'update' must be implemented.");
    }
    purge(id) {
        throw new Error("Method 'purge' must be implemented.");
    }
    readAllIds() {
        throw new Error("Method 'readAllIds' must be implemented.");
    }
}





export default RecordStoreAbstractInterface