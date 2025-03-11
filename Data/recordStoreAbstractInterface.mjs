function RecordStoreAbstractInterface() {
    return {
        create,
        read,
        readAllIds,
        update,
        purge
    }
}



function create(id) { throw Error("Not implemented") }
function update(item) { throw Error("Not implemented") }
function read(item) { throw Error("Not implemented") }
function readAllIds(item) { throw Error("Not implemented") }
function purge(item) { throw Error("Not implemented") }

export default RecordStoreAbstractInterface