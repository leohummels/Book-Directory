const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./router')
const port = 3000


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, resp, next) => {
    resp.set('Access-Control-Allow-Origin', '*')
    next()
})

app.use('/api', router)

const server = app.listen(port, () => console.log(`Rodando na porta ${port}`))

module.exports = server