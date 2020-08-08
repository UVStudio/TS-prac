import { Request, Response, NextFunction } from 'express';
import { ReqBody, ExistingData } from '../types/types';
import fs from 'fs';
//const fs = require('fs').promises;
import axios from 'axios';

let existingData: ExistingData[] = [];

//  READ users info from JPH
//  GET /api/users
//  PUBLIC
export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Get data from JPH
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    existingData = response.data;

    //then write data to data.json
    fs.writeFile('./data/data.json', JSON.stringify(existingData), (err) => {
      if (err) throw err;
    });

    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
}

//  CREATE user onto data.json
//  GET /api/users
//  PUBLIC
export function createUser(req: ReqBody, res: Response, next: NextFunction) {
  try {
    //create const for new person input
    const {
      id,
      name,
      password,
    }: { id: number; name: string; password: string } = req.body;

    /** Validations Start **/

    //check for all 3 inputs
    if (!id || !name || !password) {
      return res
        .status(400)
        .json({ msg: 'Please provide id, name, and password' });
    }

    //validate password, at least 6 characters
    if (password.length < 6) {
      return res.status(400).json({
        msg: 'Please provide a password with at least 6 characters',
      });
    }

    /** End of Validation **/

    //saving user input into const
    const person: ExistingData = req.body;

    //pick up data.json and save to array
    fs.readFile('./data/data.json', 'utf8', (err, data) => {
      if (err) throw err;
      let currentData: ExistingData[] = JSON.parse(data);

      //check to see if person already exists, by name
      for (const e of currentData) {
        if (e.name === name) {
          return res.status(400).json({ msg: 'Duplicate profile.' });
        }
      }

      //push new person currentData array
      currentData.push(person);

      //then write data.json with new person
      fs.writeFile('./data/data.json', JSON.stringify(currentData), (err) => {
        if (err) throw err;
      });
      //message
      res.status(201).json({
        success: true,
        data: `name: ${name}, id: ${id}, password: ${password}`,
      });
    });
  } catch (error) {
    next(error);
  }
}

//  UPDATE user onto data.json
//  PUT /api/users
//  PUBLIC
export function updateUser(req: ReqBody, res: Response, next: NextFunction) {
  try {
    //save update inputs into consts
    const {
      id,
      name,
      password,
    }: { id: number; name: string; password: string } = req.body;

    /** Validations Start **/

    //check for all 3 inputs
    if (!id || !name || !password) {
      return res
        .status(400)
        .json({ msg: 'Please provide id, name, and password' });
    }

    //pick up data.json and save to array
    fs.readFile('./data/data.json', 'utf8', (err, data) => {
      let currentData = JSON.parse(data);

      //locate the correct person and save new input onto that object
      let person = currentData.find((e: ExistingData) => e.id === id);

      //update person obj to new user inputs
      if (person) {
        person.name = name;
      }

      //write new data.json file with update person data
      fs.writeFile('./data/data.json', JSON.stringify(currentData), (err) => {
        if (err) throw err;
      });

      //message
      res.status(201).json({
        success: true,
        data: `name: ${name}, id: ${id}, password: ${password}`,
      });
    });
  } catch (error) {
    next(error);
  }
}
