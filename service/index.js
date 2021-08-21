const Book = require('../model')

class Service {
    constructor(repository){
        this.repository = repository
    }

    create(body){
        this.repository.insert(body)
    }

    getById(id){
        this.repository.insert(parseInt(id, 2))
    }

    getAll(){
        this.repository.SelectAll()
    }

    put(id, body){
        this.repository.updateBook(parseInt(id, 2), body)
    }

    patch(id, body){
        return this.repository.patch(parseInt(id, 2), body)
    }

    delete(id){
        this.repository.remove(parseInt(id, 2))
    }
}

module.exports = Service