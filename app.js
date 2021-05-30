require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const serve = require("./serve");
const logger = require("morgan");
const PORT = 5000;
const path = require("path");

const server = require("http").createServer(app);
const io = require("socket.io")(
  server //{
  //cors: {
  //origin: "http://localhost:3000",
  //},
  //}
);
require("./socket/chat").socket(io);

//app.use(cors());

//app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("api_key", process.env.API_KEY || "secret");
app.use(express.static("public"));

app.use(serve);

app.use(express.static(path.join(__dirname + "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"), (err) => {
    if (err) {
      res.status(500).send(err.stack);
    }
  });
});

server.listen(process.env.PORT || PORT, () => {
  console.log("Server is ready on port: " + PORT);
});
