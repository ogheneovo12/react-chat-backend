const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const app = express();
const PORT = process.env.port || 5000;
const server = http.createServer(app);
const io = socketIo(server);
const router = require("./router");
const {addUser, removeUser, getUser, getUsersInRoom, getAll} = require("./user")
app.use(router);

//listen to io connection event
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
     const {  error, user} = addUser({id:socket.id, name, room});  
     if(error)return callback(error)
     socket.emit('message',{user:"admin",text:`${user.name}, welcome to the room ${user.room}`})
     socket.broadcast.to(user.room).emit('message',{user:"admin",text:`${user.name}, just joined`})
     socket.join(user.room);
     callback();
  });

  socket.on('sendMessage',(message,callback)=>{
    const user = getUser(socket.id)
   
    io.to(user.room).emit("message",{user:user.name, text:message})
    callback();
  })
  socket.on("disconnect", () => {
    user = removeUser(socket.id);
    if(user){
      io.to(user.room).emit("message",{user:"admin", text:`${user.name } has left`})
    }
  });
  
});

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
