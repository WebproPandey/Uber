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

        if (userType === 'user') {
            await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === 'captain') {
            await CaptainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  console.log("Socket.io initialized");
};

const sendMessageToSocketID = (socketID, message) => {
  if (io) {
    io.to(socketID).emit("message", message);
  } else {
    console.error("Socket.io is not initialized");
  }
};

module.exports = { initializeSocket, sendMessageToSocketID };
