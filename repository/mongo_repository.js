const MongoClient =  require('mongodb').MongoClient

class MongoRepository {
    
    constructor(connectionString){
        this.connectionString = connectionString
        this.bookCollection = null
    }

    async init(){
        await this._connect(this.connectionString)
    }

    async _connect(connectionString){

        const client =  await MongoClient.connect(connectionString, {useUnifiedTopology: true})
        const db = client.db('bookdirectory')
        this.bookCollection = db.collection('book')

        return this.bookCollection
    }

    insert(book){
        this.bookCollection.insertOne(book)
        .then(result => console.log("Dados inseridos com sucesso", result.result))
        .catch(err => {throw new Error(err)})

        return this.book
    }

    async selectAll(){
        return await this.bookCollection.find().toArray()
    }

    async selectById(id){
        return await this.bookCollection.findOne({id: id})
    }

    async update(id, book){
        return await this.bookCollection.findOneAndUpadte(
            {id : id },
            {
                $set: {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    pages: book.pages,
                    edition: book.edition,
                    publish: book.publish

                }
            },
            {
                upsert: true
            }
        )
    }

    async patch(id, book){
        return await Object.entries(book).forEach(([key, value]) => {
            let obj = {}
            obj[key] = value
            return this.bookCollection.findOneAndUpdate({id : id}, {$set: obj})
        })
    }

    remove(id){
        this.bookCollection.deleteOne({id:id})
        .then(result => console.log(result.result))
        .catch(err => {throw new Error(err)})
    }
}

module.exports = MongoRepository