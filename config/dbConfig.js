const {Client} = require('pg')

const client = new Client
({
    host: "127.0.0.1",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "mobile_labtest_db",
})

module.exports = client