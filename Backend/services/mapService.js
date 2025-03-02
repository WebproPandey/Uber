const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {

        const apiKey = process.env.GOOGEL_MAP_APT ;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
     
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
