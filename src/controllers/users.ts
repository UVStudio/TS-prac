import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { asyncHandler } from '../middleware/async';

//  READ users info from JPH
//  GET /api/users
//  PUBLIC
export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
}

// exports.getBootcamps = asyncHandler(async (req, res, next) => {
//   res.status(200).json(res.advancedResults);
// });
