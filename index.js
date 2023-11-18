"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
var mongoose_1 = require("mongoose");
var port = 3001;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
require('dotenv').config();
var userroutes = require("./routes/auth");
var courseroutes = require("./routes/courses");
app.use((0, cors_1.default)());
var mongoDBUrl = process.env.MONGODB_URL;
if (!mongoDBUrl) {
    throw new Error('MONGODB_URL environment variable is not set');
}
mongoose_1.default.connect(mongoDBUrl).then(function () { return console.log('Connected to MongoDB'); }).catch(function (err) { return console.error('MongoDB connection error:', err); });
app.use("/courses", courseroutes);
app.use("/user", userroutes);
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
