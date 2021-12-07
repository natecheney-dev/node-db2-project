const router = require('express').Router()
const Cars = require('./cars-model')
const {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid, errorHandling} = require('./cars-middleware')

router.get('/', (req, res, next) => {
    Cars.getAll(req.params.id)
        .then(cars => {
            res.json(cars)
        })
        .catch(next)
})

router.get('/:id', checkCarId, (req, res) => {
    res.json(req.db_car)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body)
        res.status(201).json(newCar)
    } catch (err) {
        next(err)
    }
})

router.use(errorHandling);

module.exports = router 