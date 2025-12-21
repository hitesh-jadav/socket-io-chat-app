

const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("user-msg", (message) => {
    console.log("Message received:", message);
    //  socket.emit("fmsg",message)
    socket.emit("fmsg", message);
      console.log("Message send:", message+"hello");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(8000, () => {
  console.log("Server started at PORT : 8000");
});
