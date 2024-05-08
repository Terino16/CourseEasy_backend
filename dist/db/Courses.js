"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Courseschema = new mongoose.Schema({
    name: String,
    description: String,
    tags:String,
    reviews:Array,
    image: String,
    teacher: String,
    provider: String
});
exports.default = mongoose.model('Course', Courseschema);
