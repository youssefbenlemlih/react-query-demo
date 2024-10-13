var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var app = express();

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
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

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
var server = http.createServer(app);

server.listen(port);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
module.exports = app;
