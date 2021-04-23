const inquirer = require("inquirer");
const Module = require("./lib/Module");

const module = new Module();



function begin() {
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
                    module.view();
                    break;
                case 'Add employee':
                    module.add();
                    break;
                case 'Remove employee':
                    module.removeEmployee();
                    break;
                case 'Update employee role':
                    module.updateRole();
                    break;
                case 'Update employee manager':
                    module.updateManager();
                    break;
            }
        })
        
}

begin();