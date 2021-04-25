const mysql = require('mysql');

var connection;

module.exports = {

dbConnection: function () {
    console.log(arguments);
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "tracker"
    });
    connection.connect();
    return connection;
}

};