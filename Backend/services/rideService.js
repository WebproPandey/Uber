const rideModel =  require("../models/rideModel")
const mapService =  require("./mapService")



async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and Destination are required");
    }

    // Fetch distance and duration from map service
    const distanceData = await mapService.getDistanceTime(pickup, destination);

    if (!distanceData || !distanceData.distance || !distanceData.distance.value || 
        !distanceData.duration || !distanceData.duration.value) {
        throw new Error("Failed to fetch distance and duration");
    }

    // Convert distance from meters to kilometers
    const distanceInKm = distanceData.distance.value / 1000;
    
    // Convert duration from seconds to minutes
    const durationInMinutes = distanceData.duration.value / 60;

    // Fare rates
    const baseFare = { auto: 30, car: 50, motorcycle: 20 };
    const perKmRate = { auto: 20, car: 15, motorcycle: 8 };
    const perMinuteRate = { auto: 2, car: 3, motorcycle: 1.5 };

    // Calculate fare for each vehicle type
    const fare = {
        auto: baseFare.auto + (distanceInKm * perKmRate.auto) + (durationInMinutes * perMinuteRate.auto),
        car: baseFare.car + (distanceInKm * perKmRate.car) + (durationInMinutes * perMinuteRate.car),
        motorcycle: baseFare.motorcycle + (distanceInKm * perKmRate.motorcycle) + (durationInMinutes * perMinuteRate.motorcycle)
    };

    return {
        pickup,
        destination,
        distance: distanceInKm.toFixed(2),  // Keeping numeric format
        duration: durationInMinutes.toFixed(2), // Keeping numeric format
        fare
    };
}
module.exports.createRide = async ({user, pickup, destination , vehicleType}) => {
    if (!user || !pickup || !destination || !vehicleType){
        throw new Error('All Fields are required')
    }
    const fare = await getFare(pickup, destination);
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        fare: fare.fare[vehicleType]
    })
    return ride;

}
