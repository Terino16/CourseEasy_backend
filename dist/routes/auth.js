"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../db/User"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const bcryptSalt = 10;
const { jwttoken } = require('../middlewares');
router.post('/Signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userdoc = await User_1.default.create({
            name,
            email,
            password: bcryptjs_1.default.hashSync(password, bcryptSalt)
        });
        var usertoken = jwttoken(req, res);
        console.log('User created:', userdoc);
        res.cookie('token', usertoken).json(userdoc);
    }
    catch (err) {
        console.error(err);
    }
});
router.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        var usertoken = jwttoken(req, res);
        res.cookie('token', usertoken).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;
