const mysql = require('mysql2')
const inquirer = require('inquirer')

require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'company_db',
    },
    console.log('connected to db')
)

connection.connect(()=>{
    mainMenu();
})

const mainMenu = () => {
    inquirer.prompt([
        {
            type:'list',
            name: 'mainMenu',
            message: 'Select action',
            choices: [
                'View all Departments',
                'View all Roles',
                'View all Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
            ]
        }
    ])

    .then((answer) => {
        switch (answer.mainMenu) {
            case  'View all Departments':
                viewDepartments();
                break;
            case  'View all Roles':
                viewRoles();
                break;
            case  'View all Employees':
                viewEmployees();
                break;
            case  'Add a Department':
                addDepartment();
                break;
            case  'Add a Role':
                addRole();
                break;
            case  'Add an Employee':
                addEmployee();
                break;
        
            default:
                 console.log("how'd you get here?")
                break;
        }
    })
}