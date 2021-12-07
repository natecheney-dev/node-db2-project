const router = require('express').Router()
const Cars = require('./cars-model')
const {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid} = require('./cars-middleware')

