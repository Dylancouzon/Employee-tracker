const inquirer = require("inquirer");
const dbConnection = require('./mysql');
var connection = dbConnection.dbConnection();


class Delete {
    constructor() { }

    deleteEmployee() {
        inquirer
            .prompt(
                {
                    type: 'input',
                    message: 'Employee ID',
                    name: 'id',
                },
            )
            .then((response) => {
                connection.query(`DELETE FROM employee  WHERE ?`,
                    {
                        id: response.id,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log("Employee Deleted sucessfully!\n");
                    })
            })
    }

    deleteDepartment() {
        inquirer
            .prompt(
                {
                    type: 'input',
                    message: 'Department ID',
                    name: 'id',
                },
            )
            .then((response) => {
                connection.query(`DELETE FROM department  WHERE ?`,
                    {
                        id: response.id,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log("Department Deleted sucessfully!\n");
                    })
            })
    }

    deleteRole() {
        inquirer
            .prompt(
                {
                    type: 'input',
                    message: 'Role ID',
                    name: 'id',
                },
            )
            .then((response) => {
                connection.query(`DELETE FROM role  WHERE ?`,
                    {
                        id: response.id,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log("Role Deleted sucessfully!\n");
                    })
            })
    }

   
}

module.exports = Delete;