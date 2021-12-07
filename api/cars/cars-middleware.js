const Cars = require('./cars-model')
const db = require('../../data/db-config')
const vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  const {id} = req.params
  Cars.getById(id)
    .then(car => {
      if(car) {
        req.db_car = car
        next()
      } else {
        next({
          status: 404,
          message: `car with ${id} is not found`
        })
      }
    })
    .catch(next)
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  if (!vin) {
    next({
      status: 400,
      message: `vin is missing`
    })
  } else if (!make) {
    next({
      status: 400,
      message: `make is missing`
    })
  } else if (!model) {
    next({
      status: 400,
      message: `model is missing`
    })
  } else if (!mileage) {
    next({
      status: 400,
      message: `mileage is missing`
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  if (vinValidator.validate(req.body.vin)) {
    next()
  }
  else {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const vinExists = await db('cars')
    .where('vin', req.body.vin)
    .first()
    if(vinExists){
      next({
        status:400,
        message: `vin ${req.body.vin} already exists`
      })
    }
    else{
      next()
    }
  }
  catch (err) {
    next(err)
  }
}

function errorHandling(err, req, res, next) { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = {
  checkCarId, 
  checkCarPayload, 
  checkVinNumberValid, 
  checkVinNumberUnique,
  errorHandling
}