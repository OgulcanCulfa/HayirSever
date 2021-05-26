const express = require("express");
const app = express();
const routers = require("./routers");


app.use(routers.authRouter);
app.use(routers.postRouter);
app.use(routers.commentRouter);
app.use(routers.userRouter);
app.use(routers.categoryRouter);
app.use(routers.test);



module.exports = app;
