function recordStoreAbstractInterface(){
    return {
        create,
        read,
        readAllIds,
        update,
        purge,
    }
}

function create(item) {}
function update(item) {}
function read(id) {}
function readAllIds() {}
function purge(id) {}

export default recordStoreAbstractInterface