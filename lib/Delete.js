const inquirer = require("inquirer");
const dbConnection = require('./mysql');
var connection = dbConnection.dbConnection();

module.exports = {
    deleteEmployee() {
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Employee first name:',
                name: 'firstName',
            },
            {
                type: 'input',
                message: 'Employee last name',
                name: 'lastName',
            }
        ])
            .then((response) => {
                connection.query(`DELETE FROM employee  WHERE ?`,
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
                        if (res.affectedRows != 0) {
                            console.log("Employee Deleted sucessfully!\n");
                        } else {
                            console.log("Employee Not found.\n");
                        }
                        
                    })
            })
    },

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
    },

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