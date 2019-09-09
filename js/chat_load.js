"use strict"

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../example.db');

function chat_load(){
    return new Promise(resolve => {
        //ここのエラー処理怪しい
        db.serialize(() => {
            db.all('SELECT * FROM messages ORDER BY date DESC', (error,row) => {
                if(error){
                    console.error('ERROR!',error);
                    return;
                }
            resolve(row);
            });
        });
    });
}
async function chat_print(){
    console.log('load now');
    const text = await chat_load();
    console.log(text);
}

chat_print();
db.close();
