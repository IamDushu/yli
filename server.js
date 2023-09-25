const next = require("next");
const routes = require("./routes"); //Access routing
const { PORT } = require("./config"); // Project configuration
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);
const { join } = require("path");
const compression = require("compression");
const express = require("express");
const expressJSServer = express();
expressJSServer.disable("x-powered-by");
var cookieParser = require("cookie-parser");
var http = require("http");
var https = require("https");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

app.prepare().then(() => {
  expressJSServer.use(compression({ level: 9 }));
  expressJSServer.use(cookieParser());
  expressJSServer.use(
    "/robots.txt",
    express.static(join(__dirname, "/robots.txt"))
  );
  expressJSServer.use(
    "/policy.html",
    express.static(join(__dirname, "/policy.html"))
  );

  expressJSServer.use(handler).listen(PORT);
});
