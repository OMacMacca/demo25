function RecordStoreAbstractInterface() {
    return {
        create,
        read,
        readAllIds,
        update,
        purge
    }
}



function create(item) {}
function update(item) { throw Error("Not implemented") }
function read(id) { throw Error("Not implemented") }
function readAllIds() { throw Error("Not implemented") }
function purge(id) { throw Error("Not implemented") }

export default RecordStoreAbstractInterface