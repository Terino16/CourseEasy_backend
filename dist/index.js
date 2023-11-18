"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser")); // Import cookie-parser
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3001;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
require('dotenv').config();
const userroutes = require("./routes/auth");
const courseroutes = require("./routes/courses");
app.use((0, cors_1.default)());
const mongoDBUrl = process.env.MONGODB_URL;
if (!mongoDBUrl) {
    throw new Error('MONGODB_URL environment variable is not set');
}
mongoose_1.default.connect(mongoDBUrl).then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));
app.use("/courses", courseroutes);
app.use("/user", userroutes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
