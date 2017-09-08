const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const db = {
    orders: {
        1 : "Pizza",
        2 : "Salad",
        3 : "Donuts"
    }
}

app.use(bodyParser.json())

app.use((req,res,next)=>{
    req.mike = true
    next()
})

app.post('/orders', (req, res)=> {
    res.send(db.orders)
})

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


app.listen(port, function () {
    console.log(`Example app listening on port: ${port}!`)
})

