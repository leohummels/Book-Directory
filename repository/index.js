class BookRepository {
    constructor(){
        this._data = []
    }

    insert(book){
        this._data.push(book)
    }

    selectByID(id) {
        return this._data.find(b => b.id === id)
    }

    selectAll(){
        return this._data
    }

    update(id, book){
        const elementId = this._data.findIndex(element => element.id === id)
        book.id = id 

        const updateBook = Object.assign(this._data[elementId], book)
        this._data[elementId] = updateBook

        return this._data[elementId]
    }

    remove(id) {
        const index = this._data.findIndex(element => element.id === id)

        this._data.splice(index, 1)
    }
}


module.exports = BookRepository