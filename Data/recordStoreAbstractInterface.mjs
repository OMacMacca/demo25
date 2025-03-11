function RecordStoreAbstractInterface() {
    return { create, update, read, readAllIds, purge}
}



function create(item) { throw Error("Not implemented") }
function read(id) { throw Error("Not implemented") }
function readAllIds() { throw Error("Not implemented") }
function update(item) { throw Error("Not implemented") }
function purge(id) { throw Error("Not implemented") }

export default RecordStoreAbstractInterface