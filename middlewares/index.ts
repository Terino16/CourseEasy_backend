import { NextFunction } from "express";
import express from 'express';
const secretKey = "Anubhavbjpneta";
const jwt = require("jsonwebtoken");

const authenticate = (req:express.Request, res:express.Response, next:express.NextFunction) => {
 
    const sessionToken = req.cookies['token'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }
    jwt.verify(sessionToken, secretKey, (err: any, user: any) => {
      if (err) {
        return err;
      }
      req.headers["user"] = user;
      next();
    });
  
}

module.exports = {
    authenticate,
    secretKey,
}