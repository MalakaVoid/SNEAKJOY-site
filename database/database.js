const config = require('./config');
const mysql = require('mysql2');

const pool = mysql.createPool(config).promise();

pool.getConnection(function(err, connection) {
    console.log('connected to database')
});

pool.on('error', function(err) {
    console.log(err.code);
});

module.exports = {
    getConnection: () => {
      return pool.getConnection()
    }
};
