declare var require: any;

const express = require('express')
const app = express();
require('dotenv').config()
import { routing } from './routes';
import config from './config';
const database = require('./db/index');
app.use(express.json())
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

const preparedRouting = <Object>routing(database, config.secret);
Object.keys(preparedRouting).forEach((item: string) : void => {
  app.use('/', (preparedRouting as any)[item]);
});

app.listen(3000, () => {
  console.log('server listening to port 3000')
})
