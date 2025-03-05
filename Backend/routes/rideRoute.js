const express =  require('express')
const router =  express.Router()
const {body , query} =  require("express-validator")
const rideController =  require('../controllers/rideController')
const authMiddleware =  require('../middleware/authmiddleware')

router.post("/create" ,
    body("pickup").isString().isLength({min: 3}).withMessage("invalid pickup address"),
    body("destination").isString().isLength({min: 3}).withMessage("invalid destination address"),
    body("vehicleType").isString().isIn(['auto' , 'car' , 'moto']).withMessage("invalid distance"),
    authMiddleware.authUser,
    
    rideController.createRide

)

router.get("/get-fare" ,
    query("pickup").isString().isLength({min:  3}).withMessage("invalid pickup address"), 
    query("destination").isString().isLength({min:  3}).withMessage("invalid destintion"), 
    authMiddleware.authUser,
    rideController.getFare

)

router.post("/confirm" , 
    body('rideId').isMongoId().withMessage("invalid ride id"),
    authMiddleware.authCaptaine,
    rideController.confirmRide
)
module.exports = router