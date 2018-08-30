let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('my-tutorial.db', (err) => {
    if (err) {
        console.log('Could not connect to database', err)
    } else {
        console.log('Connected to database')
    }
})



module.exports = db;