const { Pool } = require('pg')

module.exports = new Pool({ 
    user:'postgress',
    password:'postgress',
    host: 'localhost',
    port: 5432,
    database:'my_teacher'
})