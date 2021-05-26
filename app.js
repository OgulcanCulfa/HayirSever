require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const serve = require("./serve");
const logger = require("morgan");
const PORT = process.env.PORT || 5000;
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.set("api_key", process.env.API_KEY || "secret");
app.use(express.static("public"));
app.use(serve);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

server.listen(PORT, () => {
  console.log("Ready on http://localhost:" + PORT);
});
