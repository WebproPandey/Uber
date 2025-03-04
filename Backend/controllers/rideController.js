const rideService =  require('../services/rideService')
const {validationResult} =  require("express-validator")

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {userId , pickup ,destination ,vehicleType} = req.body;
    try{
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType})
        return res.status(201).json(ride)
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
