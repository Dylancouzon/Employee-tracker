const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'password',
    database: 'tracker',
});

// Function to end the MySQL connection
function end() {
    connection.end();
};

class Action {
    constructor() {

    }

    view() {
        console.log('My Employees...\n');
        connection.query(`SELECT * FROM employee`, (err, res) => {
            if (err) throw err;
    
            console.log(`You have a total of ${res.length} Employees. \n`);
            if (res.length != 0) {
                res.forEach(element => {
                    console.log(`Name : ${element.first_name} ${element.lat_name}, id : ${element.id}.`);
                });
            }
        })
        
    }

    viewManager() {

    }

    addEmployee() {

    }

    removeEmployee() {

    }

    updateRole() {

    }

    updateManager() {

    }
}


// MySQL connection
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
});
module.exports = Action;