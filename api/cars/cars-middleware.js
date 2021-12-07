const Cars = require('./cars-model')

const checkCarId = (req,res,next) => {
  const id = req.params.id
  Cars.getById(id)
    .then(car =>{
      if(!car){
        next({
          status: 404,
          message: `car with ${id} is not found`
        })
      }
      else{
        req.dataCar = car
        next()
      }
    })
    .catch(next)
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body
  if(!vin) {
    next({
      status: 400,
      message: `vin is missing`
    })
  } else if(!make) {
    next({
      status: 400,
      message: `make is missing`
    })
  } else if(!model) {
    next({
      status: 400,
      message: `model is missing`
    })
  } else if(!mileage) {
    next({
      status: 400,
      message: `mileage is missing`
    })
  } else {
    next()
  }
}
