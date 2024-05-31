const express = require('express')
const path = require('path')
const mysql = require('mysql2')

const app = express()
const router = express.Router();
const port = 8000;

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'customer_db',
})

db.connect((err) => {
    if (err){
        console.log(err);
    }
    console.log('Connected to database!')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'customerList.html'))
})

app.get('/addPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'customerAdd.html'))
})

app.get('/editPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'customerEdit.html'))
})

router.get('/list', (req, res) => {
    const sql = 'SELECT * FROM CUSTOMER';
    db.query(sql, (err, data) => {
        if (err){
            console.log(err)
            return res.statusCode;
        }
        console.log(res)
        return res.json({customers: data})
    })
})

app.use('/api', router);

app.listen(port, () => {})