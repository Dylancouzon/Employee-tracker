const inquirer = require("inquirer");

const modules = require("./lib/Module");



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
                    'View Roles',
                    'Exit'
                ]
            })
        .then((response) => {
            switch (response.choice) {
                case 'View all employees':
                    modules.view(begin);
                    break;
                case 'Add Employee/Role/Department':
                    modules.add();
                    break;
                case 'Delete Employee/Role/Department':
                    modules.delete();
                    break;
                case 'Update employee':
                    modules.updateEmployee();
                    break;
                case 'View Departments':
                    modules.viewDepartments();
                    break;
                case 'View Roles':
                    modules.viewRoles();
                    break;
                case 'Exit':
                    process.exit()
            }
        })

}


begin();


