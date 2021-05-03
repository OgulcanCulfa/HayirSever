require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const serve = require("./serve");
const logger = require("morgan");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("api_key", process.env.API_KEY || "secret");
app.use(express.static("public"));
app.use(serve);

app.listen(PORT, () => {
  console.log("Ready on http://localhost:" + PORT);
});
