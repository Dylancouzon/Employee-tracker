const inquirer = require("inquirer");
const cTable = require('console.table');
const dbConnection = require('./mysql');
var connection = dbConnection.dbConnection();
const roles = [];

module.exports = {
    addEmployee(cb) {

        connection.query(`SELECT title FROM role`,
            (err, res) => {
                if (err)
                    throw err;
                res.forEach((data) => {
                    roles.push(data.title);
                });
                
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'First name:',
                            name: 'firstName',
                        },
                        {
                            type: 'input',
                            message: 'Last name',
                            name: 'lastName',
                        },
                        {
                            type: 'list',
                            message: 'Role ID',
                            name: 'roleID',
                            choices: roles,
                        },
                        {
                            type: 'input',
                            message: 'Manager ID',
                            name: 'managerID',
                        }
                    ])
                    .then((response) => {
                        connection.query(`INSERT INTO employee SET ?`,
                            {
                                first_name: response.firstName,
                                lat_name: response.lastName,
                                // Fix
                                role_id: response.roleID,
                                manager_id: response.managerID,
                            },
                            (err, res) => {
                                if (err) throw err;
                                console.log("Employee added sucessfully!\n");
                                cb();
                            })
                    })
            })


    },

    addDepartment(cb) {
        inquirer
            .prompt(
                {
                    type: 'input',
                    message: 'Department Name:',
                    name: 'department',
                },
            )
            .then((response) => {
                connection.query(`INSERT INTO department SET ?`,
                    {
                        name: response.department,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log("Department added sucessfully!\n");
                        cb();
                    })
            })
    },

    addRole(cb) {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Role title:',
                    name: 'title',
                },
                {
                    type: 'input',
                    message: 'Salary:',
                    name: 'salary',
                },
                {
                    type: 'input',
                    message: 'Department ID',
                    name: 'departmentID',
                },
            ])
            .then((response) => {
                connection.query(`INSERT INTO role SET ?`,
                    {
                        title: response.title,
                        salary: response.salary,
                        department_id: response.departmentID,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log("Role added sucessfully!\n");
                        cb();
                    })
            })
    }
};
