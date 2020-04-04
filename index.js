const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const app = express();
const PORT = process.env.port || 5000;
const server = http.createServer(app);
const io = socketIo(server)

server.listen(PORT,()=>console.log(`server is running on port ${PORT}`))