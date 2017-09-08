const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const db = {
    creditCards: []
}


app.get('/', function (req, res) {
    res.send('Welcome to Paul and Alfredo\'s Orders')
})


app.get('/new', function (req, res) {
    res.send({
        something: 'else',
        someArray: [
            {"one": 1 },
            {"two": 2 }

        ]
    })
})

app.get('/allOrders', function (req, res) {
    res.send(db.creditCards)
    doSomething1()
    doSomething2()
})

app.put('/save', bodyParser.json(), function (req, res) {
    res.send('got it.')
})


app.listen(port, function () {
    console.log(`Example app listening on port: ${port}!`)
})

