require("rootpath")();
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const initialize = require("helpers/db");
const apiErrorHandler = require("utils/apiErrorHandler");
const webRoutes = require("routes/web.routes");
const adminRoutes = require("routes/admin.routes");

// allow cors requests from any origin and with credentials
app.use(
    cors({
        origin: (origin, callback) => callback(null, true),
        credentials: true,
    })
);

// bodyparse middleware
app.use(express.json({ limit: "100mb", parameterLimit: 100000000 }));
app.use(
    express.urlencoded({
        limit: "100mb",
        extended: true,
        parameterLimit: 100000000,
    })
);

// static files
app.use(express.static("public"));

// Cookie Middleware
app.use(cookieParser());

// initialize database
initialize();

// api routes
app.use("/api/v1/web", webRoutes);
app.use("/api/v1/admin", adminRoutes);

// global error handler
app.use(apiErrorHandler);

// start server
const port = process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 8000;
app.listen(port, "0.0.0.0", () => console.log("🚀 Server listening on port " + port));
