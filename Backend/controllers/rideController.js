const rideService =  require('../services/rideService')
const {validationResult} =  require("express-validator")
const mapService =  require("../services/mapService")
const {sendMessageToSocketID} =  require("../Socket")
const rideModel = require('../models/rideModel')

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {userId , pickup ,destination ,vehicleType} = req.body;
    try{
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType})
        res.status(201).json(ride)
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup)
        console.log(pickupCoordinates);
        const captainsInRaduis = await mapService.getcaptainsInTheRadius(pickupCoordinates.ltd , pickupCoordinates.lng, 2000)
        ride.otp = ""
        const rideWithUser =  await rideModel.findOne({_id: ride._id}).populate('user') 
        captainsInRaduis.map(  captain => {
          console.log(captain, ride)
          sendMessageToSocketID(captain.socketId,{
            event:'new-ride',
            data: rideWithUser
          })
        })
    }catch (err) {
        console.error(err)
        return res.status(500).json({error: 'Server Error'})
    
    }


}


module.exports.getFare = async (req, res) => {
  try {
    const { pickup, destination } = req.query;

    if (!pickup || !destination) {
      return res.status(400).json({ message: "Pickup and destination are required" });
    }

    const fareData = await rideService.getFare(pickup, destination);
    return res.status(200).json(fareData);
  } catch (error) {
    console.error("Error fetching fare:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.confirmRide=  async (req, res) =>{
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const {rideId} = req.body
  try{
    const ride = await rideService.confirmRide({rideId, captain:req.captain})
    if(!ride){
      return res.status(404).json({message: 'Ride not found'})
    }
    res.status(200).json(ride)
  }catch(err){
    console.error(err.message)
    return res.status(500).json({error: 'Server Error'})
  }
}
