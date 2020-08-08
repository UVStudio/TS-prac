"use strict";
// const jwt = require('jsonwebtoken');
// import { Request, Response, NextFunction } from 'express';
// export async function protect(req: Request, res: Response, next: NextFunction) {
//   let token: string = '';
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     //set token from Bearer token in header
//     token = req.headers.authorization.split(' ')[1];
//     //set token from cookie
//   } else if (req.cookies.token) {
//     token = req.cookies.token;
//   }
//   //Make sure token is sent
//   if (!token) {
//     return next();
//   }
//   try {
//     //Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     //req.user = await User.findById(decoded.id);
//     next();
//   } catch (error) {
//     next(error);
//   }
// }
