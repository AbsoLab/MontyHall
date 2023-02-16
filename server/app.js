const express = require('express');
const app = express();

const db = require('./db/service');

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    db.getAllData((result) => { res.send(result) });
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})