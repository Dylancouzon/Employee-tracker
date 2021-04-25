const inquirer = require("inquirer");
const add = require("./Add");
const view = require("./View");
const del = require("./Delete");
const update = require("./Update");
const dbConnection = require('./mysql');
var connection = dbConnection.dbConnection();

module.exports = {
    //View Employees function
    view(cb) {
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
                        return view.viewEmployees(cb);
                    case 'View all employees by Department':
                        return view.viewEmployeesDepartment();
                    case 'View all employees by Manager':
                        return view.viewEmployeesManager();
                }
            })
    },

    //Add employee function
    add() {
        inquirer
            .prompt(
                {
                    type: 'list',
                    message: 'Pick one option:',
                    name: 'choice',
                    choices: [
                        'Add an employee',
                        'Add a department',
                        'Add a role',
                    ]
                })
            .then((response) => {
                switch (response.choice) {
                    case 'Add an employee':
                        return add.addEmployee();
                    case 'Add a department':
                        return add.addDepartment();
                    case 'Add a role':
                        return add.addRole();
                }
            })
    },

    delete() {
        inquirer
            .prompt(
                {
                    type: 'list',
                    message: 'Pick one option:',
                    name: 'choice',
                    choices: [
                        'DELETE an employee',
                        'DELETE a department',
                        'DELETE a role',
                    ]
                })
            .then((response) => {
                switch (response.choice) {
                    case 'DELETE an employee':
                        return del.deleteEmployee();
                    case 'DELETE a department':
                        return del.deleteDepartment();
                    case 'DELETE a role':
                        return del.deleteRole();
                }
            })
    },

    updateEmployee() {
        inquirer
            .prompt(
                {
                    type: 'input',
                    message: 'Employee ID:',
                    name: 'id',
                },
            )
            .then((response) => {
                connection.query(`SELECT * FROM employee WHERE ?`,
                    {
                        id: response.id,
                    },
                    (err, res) => {
                        if (err) throw err;
                        if (res.length != 0) {
                            console.log(`Employee selected ${res[0].first_name} ${res[0].lat_name}.\n`)
                            inquirer
                                .prompt(
                                    {
                                        type: 'list',
                                        name: 'choice',
                                        choices: [
                                            'Update name',
                                            'Update Role ID',
                                            'Update Manager ID',
                                        ]
                                    })
                                .then((response) => {
                                    switch (response.choice) {
                                        case 'Update name':
                                            return update.name(res[0].id);
                                        case 'Update Role ID':
                                            return update.role(res[0].id);
                                        case 'Update Manager ID':
                                            return update.manager(res[0].id);
                                    }
                                })
                        } else {
                            console.log("Employee Not found.\n");
                        }
                    })
            })
    },

    viewRoles() {
        return view.viewRoles();
    }

}