'use strict'

const express=require('express');
const bodyParser = require('body-parser');
const app = express();
//データベース用
const moment = require('moment');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.db');


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});


app.post('/', (req, res) => {
    const date = moment().format('YYYY-MM-DD HH:mm:s');
    const user = req.body.name;
    const text = req.body.text;
    function chat_save(){
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS messages (date TEXT, user TEXT, content TEXT)');
       	const add = db.prepare('INSERT INTO messages (date, user, content) VALUES (?, ?, ?)');
            add.run([`${date}`, `${user}`, `${text}`]);
            add.finalize();
        });
    }    
        chat_save();
        res.status(200);
        res.sendFile(__dirname + '/html/index.html');
});

app.get('/database', (req, res) => {

    function chat_load(){
        return new Promise(resolve => {
            db.serialize(() => {
                db.all('SELECT * FROM messages ORDER BY date DESC', (error, row) => {
                    if(error){
                        console.log('ERROR!', error);
                        return;
                    }
                resolve(row);
                });
            });
        });
    }

    async function chat_print(){
        const text = await chat_load();
        res.send(text);
    }

    chat_print();
});


app.listen(3000, () => console.log('Express app listening on port 3000!'));
process.on('beforeExit', () =>{
	db.close();
});
