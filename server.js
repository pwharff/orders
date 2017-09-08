const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
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
        const shipmentResponse =
          await fetch('https://er-shipping.herokuapp.com/shipments', {
              method: 'GET' //should be post
          })
        if (!shipmentResponse.ok)
            return res.status(200).send({ok: true, message:'Order placed but not shipped.'})
        const shipment = await shipmentResponse.json()
        res.send({
            ok: true,
            shipment,
            value: newOrder
        })
    } catch (excp) {
        //An exception means that the shipment request failed completely - as in network down
        //or connection lost, not just a 500 error
        return res.status(200).send({ok: true, message:'Order placed but not shipped.'})
    }

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

