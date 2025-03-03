const express =  require('express')
const router =  express.Router()
const {body} =  require("express-validator")
const rideController =  require('../controllers/rideController')
const authMiddleware =  require('../middleware/authmiddleware')

router.post("/create" ,
    body("pickup").isString().isLength({min: 3}).withMessage("invalid pickup address"),
    body("destination").isString().isLength({min: 3}).withMessage("invalid destination address"),
    body("vehicleType").isString().isIn(['auto' , 'car' , 'motorcycle']).withMessage("invalid distance"),
    authMiddleware.authUser,
    rideController.createRide

)

module.exports = router