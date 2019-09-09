const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../example.db');

db.serialize(() => {
    db.all('SELECT * FROM messages ORDER BY date DESC', (error,row) => {
        if(error){
            console.error('ERROR!',error);
            return;
        }
    console.log(row);
    });
});

db.close();
