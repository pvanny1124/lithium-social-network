"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
require('dotenv').config();
const routes_1 = require("./routes");
const config_1 = __importDefault(require("./config"));
const database = require('./db/index');
app.use(express.json());
// console.log(database);
// async function func() {
//   try {
//     const resp = await database.result("insert into users (first_name, last_name, email, password) values ('Patrick', 'Hammet', 'pvanny1124@gmail.com', 1234);");
//     console.log(resp);
//   } catch (error) {
//     console.log(error);
//   }
// }
// func();
const preparedRouting = (0, routes_1.routing)(database, config_1.default.secret);
Object.keys(preparedRouting).forEach((item) => {
    app.use('/', preparedRouting[item]);
});
app.listen(3000, () => {
    console.log('server listening to port 3000');
});
