const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const mysql = require('mysql2')

const app = express()
const router = express.Router();
const port = 8000;

app.use(bodyParser.json());
app.use('/api', router);

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'customer_db',
})

db.connect((err) => {
    if (err) {
        console.log('Failed to connect database: ', err);
        return;
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

router.post('/listAllCustomer', (req, res) => {
    const sql = 'SELECT * FROM CUSTOMER';
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, customers: data });
    })
})

router.post('/searchCustomer', (req, res) => {
    const name = req.body.name;
    const ic = req.body.ic;
    const sql = 'SELECT * FROM CUSTOMER WHERE name=? AND ic=?';
    const values = [name, ic]
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, customers: data });
    })
})

router.post('/addCustomer', (req, res) => {
    const name = req.body.name;
    const ic = req.body.ic;
    const dob = req.body.dob;
    const address = req.body.address;
    const addressCountry = req.body.addressCountry;
    const addressPostcode = req.body.addressPostcode;
    const sql = 'INSERT INTO CUSTOMER (name, ic, date_of_birth, address, address_country, address_postcode) VALUES(?, ?, ?, ?, ?, ?)';
    const values = [name, ic, dob, address, addressCountry, addressPostcode]
    console.log(values)
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        console.log('yes')
        res.json({ success: true, message: 'Customer added successfully!' });
    })
})

router.post('/editCustomer', (req, res) => {
    const name = req.body.name;
    const ic = req.body.ic;
    const dob = req.body.dob;
    const address = req.body.address;
    const addressCountry = req.body.addressCountry;
    const addressPostcode = req.body.addressPostcode;
    const sql = 'UPDATE CUSTOMER SET date_of_birth=?, address=?, address_country=?, address_postcode=? WHERE name=? AND ic=?';
    const values = [dob, address, addressCountry, addressPostcode, name, ic]
    console.log(values)
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        console.log('yes')
        res.json({ success: true, message: 'Customer edited successfully!' });
    })
})


app.listen(port, () => {
    console.log('Application listening at localhost port 8000!')
})