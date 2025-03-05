function recordStoreAbstractInterface(){
    return {
        create,
        read,
        update,
        purge,
    }
}

function create(id) {throw Error("Not Implemented")}
function update(item) {throw Error("Not Implemented")}
function read(item) {throw Error("Not Implemented")}
function purge(item) {throw Error("Not Implemented")}

export default recordStoreAbstractInterface