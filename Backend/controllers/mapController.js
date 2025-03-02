const mapsService = require("../services/mapService")
const {validationResult} =  require('express-validator')

 module.exports.getCoordinates=  async (req , res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {address} = req.query
    try {
        const coordinates = await mapsService.getAddressCoordinate(address)
        res.status(200).json({ coordinates })    
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
 }