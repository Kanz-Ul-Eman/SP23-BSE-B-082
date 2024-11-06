const express = require("express");
let server = express();

server.use(express.static(__dirname));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
