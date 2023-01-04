const fs = require('fs');

const pgp = require('pg-promise')({
  error(err: Error, e: any) {
    if (e.cn) {
      fs.writeFile('db.log.txt', `DB ERROR: ${err}${e}${e.cn}`, function(err: Error) {
        if (err) {
          return console.log(err);
        }
      });
      console.log('E: ', err, e, e.cn);
    }
  },
});


const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE } = process.env;

const db = pgp({
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
});

module.exports = db;
