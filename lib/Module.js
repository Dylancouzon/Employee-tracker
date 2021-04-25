const inquirer = require("inquirer");
const Add = require("./Add");
const View = require("./View");
const Delete = require("./Delete");
const add = new Add();
const view = new View();
const del = new Delete();

class Module {
    constructor() {
    }

    //View Employees function
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
                        return view.viewEmployees();
                    case 'View all employees by Department':
                        return view.viewEmployeesDepartment();
                    case 'View all employees by Manager':
                        return view.viewEmployeesManager(employeesManagerCB);
                }
            })
    }

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
    }

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
    }

    updateRole() {

    }

    updateManager() {

    }

}




module.exports = Module;