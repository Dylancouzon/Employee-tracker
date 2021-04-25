const inquirer = require("inquirer");

//Externalise the mysqlfile
const dbConnection = require('./mysql');
var connection = dbConnection.dbConnection();

class Module {
    constructor() {
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
                        'View all employees by Department',
                        'View all employees by Manager',
                    ]
                })
            .then((response) => {
                switch (response.choice) {
                    case 'View all employees':
                        return viewEmployees();
                    case 'View all employees by Department':
                        return viewEmployeesDepartment();
                    case 'View all employees by Manager':
                        return viewEmployeesManager(employeesManagerCB);
                }
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
function viewEmployeesManager(cb) {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Manager first name:',
                name: 'firstName',
            },
            {
                type: 'input',
                message: 'Manager last name',
                name: 'lastName',
            }
        ])
        .then((response) => {
            connection.query(`SELECT id FROM employee WHERE ? AND ?`,
                [
                    {
                        first_name: response.firstName,
                    },
                    {
                        lat_name: response.lastName,
                    },
                ],
                (err, res) => {
                    if (err) throw err;
                    if (res.length != 0) {
                        cb(res[0].id, response.firstName, response.lastName);
                    } else {
                        console.log("Manager Not found.\n");
                        connection.end();
                    }
                })
        })
};

function employeesManagerCB(managerId, firstName, lastName) {
    connection.query(`SELECT first_name, lat_name AS last_name  FROM employee WHERE manager_id = '${managerId}'`,
        (err, res) => {
            if (err) throw err;
            if (res.length != 0) {
                //Manually add the Manager name to each value.
                let result = res.map(function (i) {
                    i.manager_name = firstName + " " + lastName;
                    return i;
                })
                console.table(result);
                connection.end();
            } else {
                console.log("Test");
                connection.end();
            }
        })
}

function viewEmployeesDepartment() {
    inquirer
        .prompt(
            {
                type: 'input',
                message: 'Department id:',
                name: 'department',
            })
        .then((response) => {
            connection.query(`
            SELECT employee.first_name, employee.lat_name AS last_name,
            role.title, department.name AS department
            FROM employee 
            INNER JOIN role ON employee.role_id=role.id
            INNER JOIN department ON role.department_id=department.id WHERE department.id = ${response.department}`,
                (err, res) => {
                    if (err) throw err;
                    if (res.length != 0) {
                        console.table(res)
                    }
                    connection.end();
                })
        })

}

function viewEmployees() {
    console.log('My Employees...\n');
    connection.query(`
    SELECT employee.first_name, employee.lat_name AS last_name,
    role.title, department.name AS department
    FROM employee 
    INNER JOIN role ON employee.role_id=role.id
    INNER JOIN department ON role.department_id=department.id`,
        (err, res) => {
            if (err) throw err;

            console.log(`You have a total of ${res.length} Employees. \n`);
            if (res.length != 0) {
                console.table(res)
            }
        })
    connection.end();
}

module.exports = Module;