const router = require('express').Router()
const MongoRepository = require('../repository/mongo_repository.js')
const Service = require('../service')
const MongoRepo = new MongoRepository('mongodb://admin:password@localhost:27017')
MongoRepo.init()
const bookRepository = require('../repository')

//const service = new Service(MongoRepo)
const service = new Service(MongoRepo)

router.param('id', (req, res, next, id) => {
    req.id_from_param = id
    next()
})

router.post('/', async (req, res) => {
    const book = req.body

    service.create(book)

    res.status(201).json(book)
})

router.get('/health', (req, res) => {

    res.status(200).json({status: 'Ok'})
})

router.get('/:id', async (req, res) => {
    const idBook = req.id_from_param

    const result = await service.getById(idBook)
    if(result !== undefined) {
        res.status(200).json(result)
        return
    }

    res.sendStatus(204);
})

router.get('/', async (req, res) => {
    const result = await service.getAll()
    if(result.length > 0) {
        res.status(200).json(result)
        return
    }

    res.sendStatus(204);
})

router.put("/:id", async (req, res) => {

    const id = req.params.id
    const body = req.body

    const result = await service.put(id, body)

    res.status(200).json(result)
})

router.patch("/:id", async (req, res) => {
    const id = req.params.id
    const body = req.body

    service.patch(id, body)

    res.sendStatus(204)
})

router.delete('/:id', (req, res) => {
    const idBook = req.params.id

    service.remove(idBook)
    
    res.sendStatus(204)
    
})

/*router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204)
    res.end()
})*/

module.exports = router