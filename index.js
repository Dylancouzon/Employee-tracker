const inquirer = require("inquirer");
const Module = require("./lib/Module");



function begin() {
    const module = new Module();

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
                case 'Add Employee/Role/Department':
                    module.add();
                    break;
                case 'Delete Employee/Role/Department':
                    module.delete();
                    break;
                case 'Update employee':
                    module.updateRole();
                    break;
                case 'View Departments':
                    module.viewDepartments();
                    break;
                case 'View Roles':
                    module.viewRoles();
                    break;
            }
        })

}


begin();


