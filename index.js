/**  when we want to attach the socket to the server then we cannot do like "app.listen" dirctly  that's why we have to create a server first and then attach the socket to the server
so for this we use http module
*/
const http = require("http");

const express = require("express");
const app = express();

const path = require("path");
const { Server } = require("socket.io");
const server = http.createServer(app);

app.use(express.static(path.resolve("./public")));

/**
 * @description:  All the http request will be handled by express and all the socket request will be handled by socket.io
 * @use_of_io - handle all the socket request
 * @use_of_express - handle all the http request
 */
const io = new Server(server);

/**
 * @description:  socket means every connection client is socket for us......
 */
io.on("connection", (socket) => {
  //   console.log("A new user connected", socket.id);
  socket.on("user-message", (message) => {
    // console.log("A new user message : ", data);
    io.emit("message", message);
  });
});

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});
server.listen(9000, () => {
  console.log(`server is running on port http://localhost:9000`);
});
