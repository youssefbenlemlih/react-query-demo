var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use((req, res, next) => {
  setTimeout(() => {
    next(); // Continue to the next middleware or route handler
  }, 1000); // 1000ms = 1 second delay
});
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

var http = require("http");

var port = (process.env.PORT || "3000");
app.set("port", port);
var server = http.createServer(app);

server.listen(port);

module.exports = app;
