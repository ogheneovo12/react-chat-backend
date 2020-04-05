const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const app = express();
const PORT = process.env.port || 5000;
const server = http.createServer(app);
const io = socketIo(server);
const router = require("./router");
app.use(router);

//listen to io connection event
io.on("connection",socket =>{
    console.log("we've got a new user")
    socket.on("disconnect",()=>{
        console.log("user left chatroom")
    })
})



server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
