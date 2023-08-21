const express = require('express')
const app = express()
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    insecureAuth: true
};

const mysql = require('mysql2');

app.get('/', async(req, res) => {
    const connection = await mysql.createPool(config);
    const createTable = `CREATE TABLE IF NOT EXISTS people(name varchar(200))`;
    await connection.promise().execute(createTable);
    const sql = `INSERT INTO people(name) values ('Leo')`;
    connection.query(sql);

    const [response] = await connection.promise().execute("SELECT * FROM people");

    let list = '<ul>';
    response.forEach(({name}) => list += `<li>${name}</li>`);
    list += '</ul>';
    res.send(`
    <h1>Full Cycle Rocks!</h1>
    ${list}
`)
})

app.listen(port, () => {
    console.log('Application running on port:', port)
})