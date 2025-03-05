const { Server } = require("socket.io");
const  userModel =  require("./models/userModel")
const  CaptainModel =  require("./models/captainModel")
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('join', async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType} with socket ${socket.id}`);
  
      try {
          if (userType === 'user') {
              const updatedUser = await userModel.findByIdAndUpdate(
                  userId,
                  { socketId: socket.id },
                  { new: true } 
              );
              // console.log("Updated User:", updatedUser);
          } else if (userType === 'captain') {
              const updatedCaptain = await CaptainModel.findByIdAndUpdate(
                  userId,
                  { socketId: socket.id },
                  { new: true }
              );
              console.log("Updated Captain:", updatedCaptain);
          }
      } catch (error) {
          console.error("Error updating socketId:", error);
      }
  });
  
  socket.on("update-location-captain", async (data) => {

    const { userId, location } = data;
    if(!location || !location.ltd || !location.lng){
      return socket.emit('error' ,{meddage: 'invalid location data'})
    }

    console.log(`Captain ${userId} updated location to ${location} with socket ${socket.id}`);
    await CaptainModel.findByIdAndUpdate(userId, {
      location:{
      ltd:location.ltd,
      lng:location.lng,
    }}
  )

  
  });
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  console.log("Socket.io initialized");
};

const sendMessageToSocketID = (socketID, messageObject) => {
  console.log(`Sending message to socket ${socketID}:`, messageObject);
  if (io) {
    io.to(socketID).emit(messageObject.event, messageObject.data);
  } else {
    console.error("Socket.io is not initialized");
  }
};

module.exports = { initializeSocket, sendMessageToSocketID };
