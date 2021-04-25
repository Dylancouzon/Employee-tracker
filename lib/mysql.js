const mysql = require('mysql');
const inquirer = require("inquirer");
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
    },

};