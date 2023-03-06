const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./db/service');

app.use(cors());
app.set('port', process.env.PORT || 3000);


app.get('/', (req, res) => {
    db.getAllData((result) => { res.send(result) });
})

app.get('/1', (req, res) => {
    db.updateChangeWin();
    res.send(true);
})

app.get('/2', (req, res) => {
    db.updateChangeLose();
    res.send(true);
})

app.get('/3', (req, res) => {
    db.updateUnChangeWin();
    res.send(true);
})

app.get('/4', (req, res) => {
    db.updateUnChangeLose();
    res.send(true);
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})