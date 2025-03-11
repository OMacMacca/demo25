function RecordStoreAbstractInterface() {
    return { create, update, read, /*readAllIds,*/ purge}
}



function create(item) {throw Error("Not Implemented")}
function read(id) {throw Error("Not Implemented")}
//function readAllIds() {throw Error("Not Implemented")}
function update(item) {throw Error("Not Implemented")}
function purge(id) {throw Error("Not Implemented")}

export default RecordStoreAbstractInterface