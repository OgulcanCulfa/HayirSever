const express = require("express");
const app = express();
const routers = require("./routers");

app.get("/", function (req, res) {
  res.send("Server is on");
});


app.use(routers.authRouter);
app.use(routers.postRouter);
app.use(routers.commentRouter);
app.use(routers.test);

app.use((req, res, next) => {
  res.status(404).send("404 NOT FOUND");
});

module.exports = app;
