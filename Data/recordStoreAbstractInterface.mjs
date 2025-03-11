function RecordStoreAbstractInterface() {
    return { create, update, read, /*readAllIds,*/ purge}
}



function create(item) {}
function read(id) {  }
//function readAllIds() { }
function update(item) {  }
function purge(id) { }

export default RecordStoreAbstractInterface