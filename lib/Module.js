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

class Module{
    constructor(){
        
    }

view() {
    inquirer
        .prompt(
            {
                type: 'list',
                message: 'Pick one option:',
                name: 'choice',
                choices: [
                    'View all employees',
                    'Add Employee/Role/Department',
                    'Delete Employee/Role/Department',
                    'Update employee',
                    'View Departments',
                    'View Roles'
                ]
            })
        .then((response) => {
            switch (response.choice) {
                case 'View all employees':
                    action.view();
                    break;
                case 'Add employee':
                    action.add();
                    break;
                case 'Remove employee':
                    action.removeEmployee();
                    break;
                case 'Update employee role':
                    action.updateRole();
                    break;
                case 'Update employee manager':
                    action.updateManager();
                    break;
            }
        })

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
    //Add search by manager + roles
}

viewDepartment() {
    inquirer
        .prompt(
            {
                type: 'input',
                message: 'Department number:',
                name: 'department',
            })
        .then((response) => {
            connection.query(`SELECT * FROM top5000 WHERE song= '${response.song}'`, (err, res) => {
                if (err) throw err;

                console.table(res);
                connection.end();
            })
        })

}

add() {

}

remove() {

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

module.exports = Module;