const inquirer = require("inquirer");
const Action = require("./lib/employee");

const action = new Action();



function begin() {
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
                    'Add employee',
                    'Remove employee',
                    'Update employee role',
                    'Update employee manager'
                ]
            })
        .then((response) => {
            switch (response.choice) {
                case 'View all employees':
                    action.view();
                    break;
                case 'View all employees by Department':
                    action.viewDepartment();
                    break;
                case 'View all employees by Manager':
                    action.viewManager();
                    break;
                case 'Add employee':
                    action.addEmployee();
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
        
}

begin();