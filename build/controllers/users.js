"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUsers = void 0;
const fs_1 = __importDefault(require("fs"));
//const fs = require('fs').promises;
const axios_1 = __importDefault(require("axios"));
let existingData = [];
//  READ users info from JPH
//  GET /api/users
//  PUBLIC
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Get data from JPH
            const response = yield axios_1.default.get('https://jsonplaceholder.typicode.com/users');
            existingData = response.data;
            //then write data to data.json
            fs_1.default.writeFile('./data/data.json', JSON.stringify(existingData), (err) => {
                if (err)
                    throw err;
            });
            res.status(200).json(response.data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUsers = getUsers;
//  CREATE user onto data.json
//  GET /api/users
//  PUBLIC
function createUser(req, res, next) {
    try {
        //create const for new person input
        const { id, name, password, } = req.body;
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
        const person = req.body;
        //pick up data.json and save to array
        fs_1.default.readFile('./data/data.json', 'utf8', (err, data) => {
            if (err)
                throw err;
            let currentData = JSON.parse(data);
            //check to see if person already exists, by name
            for (const e of currentData) {
                if (e.name === name) {
                    return res.status(400).json({ msg: 'Duplicate profile.' });
                }
            }
            //push new person currentData array
            currentData.push(person);
            //then write data.json with new person
            fs_1.default.writeFile('./data/data.json', JSON.stringify(currentData), (err) => {
                if (err)
                    throw err;
            });
            //message
            res.status(201).json({
                success: true,
                data: `name: ${name}, id: ${id}, password: ${password}`,
            });
        });
    }
    catch (error) {
        next(error);
    }
}
exports.createUser = createUser;
//  UPDATE user onto data.json
//  PUT /api/users
//  PUBLIC
function updateUser(req, res, next) {
    try {
        //save update inputs into consts
        const { id, name, password, } = req.body;
        /** Validations Start **/
        //check for all 3 inputs
        if (!id || !name || !password) {
            return res
                .status(400)
                .json({ msg: 'Please provide id, name, and password' });
        }
        //pick up data.json and save to array
        fs_1.default.readFile('./data/data.json', 'utf8', (err, data) => {
            let currentData = JSON.parse(data);
            //locate the correct person and save new input onto that object
            let person = currentData.find((e) => e.id === id);
            //update person obj to new user inputs
            if (person) {
                person.name = name;
            }
            //write new data.json file with update person data
            fs_1.default.writeFile('./data/data.json', JSON.stringify(currentData), (err) => {
                if (err)
                    throw err;
            });
            //message
            res.status(201).json({
                success: true,
                data: `name: ${name}, id: ${id}, password: ${password}`,
            });
        });
    }
    catch (error) {
        next(error);
    }
}
exports.updateUser = updateUser;
