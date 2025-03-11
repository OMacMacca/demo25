function RecordStoreAbstractInterface() {
    return { 
        create(item) {},
        read(item) {throw Error("Not Implemented")},
        //readAllIds() {throw Error("Not Implemented")},
        update(item) {throw Error("Not Implemented")},
        purge(item) {throw Error("Not Implemented")}
    }
}

export default RecordStoreAbstractInterface