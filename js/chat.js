const moment = require('moment');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.db');


const text = 'こんにちは';
const user = 'YA';
const date = moment().format('YYYY-MM-DD HH:mm:s');
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS messages (date text, user text, content text)');
    const add = db.prepare('INSERT INTO messages (date, user, content) VALUES (?, ?, ?)');
    add.run([`${date}`, `${user}`, `${text}`]);
    add.finalize();
});

db.close();
