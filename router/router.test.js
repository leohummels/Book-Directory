const supertest = require('supertest')
const server = require('../index')


afterAll( async () => {
    server.close()
});

describe('Request to the server', () => {

    it('Should create a book', async () => {
        const resp = await supertest(server).post('/api').send({
            'id': 1,
            'title': 'Brave New World',
            'author': 'Aldous Huxley',
            'pages': '312',
            'edition': "6",
            'publish': "2014"
        });

        expect(resp.statusCode).toEqual(201)
        expect(resp.body.title).toEqual('Brave New World')
    })
})

