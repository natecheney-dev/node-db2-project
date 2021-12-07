const express = require("express")

const CarsRouter = require('./cars/cars-router')

const server = express()

server.use(express.json());

server.use('/api/cars', CarsRouter)

server.get('/', (req, res) => {
    res.status(200).json(
        '<h1>api is up</h1>'
    )
})

module.exports = server
