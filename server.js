const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const _ = require('lodash')

const db = {
    orders: {
        1: "Pizza",
        2: "Salad",
        3: "Donuts"
    }
}

app.use(bodyParser.json())

const getOkSoon = sec =>
    new Promise((resolve, reject) =>
        setTimeout(() => resolve({ok: 'all good!'}), sec * 1000))

app.post('/orders', async (req, res) => {
    const id = _.maxBy(Object.keys(db.orders), key => Number(key)) + 1
    const {type} = req.body
    //some kind of validation of type here -- probably automatic using joi
    const newOrder = {
        id,
        type
    }
    db.orders[id] = newOrder
    //hit the other API to place the shipment!!!
    // const shipment = await fetch('https://api.github.com/users/defunkt')
    try {
        const shipment = await fetch('https://er-shipping.herokuapp.com/shipments', {method: 'get'})
    } catch (excp) {
        console.log (excp)
    }
    res.send({
        ok: true,
        shipment,
        value: newOrder
    })
})

app.get('/', function (req, res) {
    res.send('Welcome to Paul and Alfredo\'s Orders')
})


app.get('/orders', function (req, res) {
    res.send(
        db.orders
    )
})


app.listen(port, function () {
    console.log(`Example app listening on port: ${port}!`)
})

