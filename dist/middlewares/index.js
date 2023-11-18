"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secretKey = "Anubhavbjpneta";
const expiresIn = "1h";
const jwt = require("jsonwebtoken");
const jwttoken = (req, res) => {
    const username = { username: req.headers.username };
    const token = jwt.sign(username, secretKey, { expiresIn });
    return token;
};
const authenticate = (req, res, next) => {
    const authorization = req.headers.token;
    if (!authorization) {
        return res.sendStatus(403).send({ message: "No Token Provided" });
    }
    else {
        jwt.verify(authorization, secretKey, (err, user) => {
            if (err) {
                return err;
            }
            req.user = user;
            next();
        });
    }
};
module.exports = {
    authenticate,
    secretKey,
    jwttoken
};
