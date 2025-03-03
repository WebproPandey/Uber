const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
    if (!address) {
        throw new Error("Address is required");
    }

        const apiKey = process.env.GOOGLE_MAP_API ;
        const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
     
        try{
            const response = await axios.get(url);
            if (response.data.status === "OK") {
                const loaction = response.data.results[0].geometry.location;
                return {
                     latitude: loaction.lat,
                     longitude: loaction.lng 
                    };
            } else {
                throw new Error(`Geocode API error: ${response.data.error?.message || response.data.status}`);
            }
            

        }catch (error) {
            console.log(`Error fetching geolocation: ${error.message}`);
            throw new Error("Failed to fetch geolocation");

        } 
}

module.exports.getDistanceTime =  async (origin , destination) => {
    
  
    if (!origin ||!destination) {
        throw new Error("Origin and destination are required");
    }


    const apiKey = process.env.GOOGLE_MAP_API ;
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    
    try{
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            return response.data.rows[0].elements[0]
        }
        else {
            throw new Error(`Distance matrix API error: ${response.data.error?.message || response.data.status}`);
        }
}
    catch (error) {
        console.log(`Error fetching distance and time: ${error.message}`);
        throw new Error("Failed to fetch distance and time");
    }
}

module.exports.getAutoSuggestions = async  (input) =>{
    if (!input) {
        throw new Error("Input is required");
    }
    const apiKey = process.env.GOOGLE_MAP_API ;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            return response.data.predictions
        }
        else {
            throw new Error(`Autocomplete API error: ${response.data.error?.message || response.data.status}`);
        }
    }
    catch (error) {
        console.log(`Error fetching auto suggestions: ${error.message}`);
        throw new Error("Failed to fetch auto suggestions");
    }

}
