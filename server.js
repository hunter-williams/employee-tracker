const mysql = require('mysql2')
const inquirer = require('inquirer')

require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'company_db',
    },
    console.log(' === connected to db === ')
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

function viewDepartments(){
    console.log('view departments')
    connection.query('SELECT * FROM department;', function (error, results){
        try {
            console.table(results)
            mainMenu()
        } catch (error) {
            console.log(error)
        }
    }) 

}

function viewRoles(){
    console.log('view roles')
    connection.query('SELECT * FROM roles;', function (error, results){
        try {
            console.table(results)
            mainMenu()
        } catch (error) {
            console.log(error)
        }
    })
}

function viewEmployees(){
    console.log('view emplyeee')
    connection.query('SELECT * FROM employee;', function (error, results){
        try {
            console.table(results)
            mainMenu()
        } catch (error) {
            console.log(error)
        }
    })
}

function addDepartment(){
    console.log('add department')

    var departmentPrompt = [
        {
            type: 'input',
            name: 'departmentName',
            message: 'what is the new department name?'
        }
    ]

    inquirer.prompt( departmentPrompt ) 
        .then((response) => {
            
            connection.query("INSERT INTO department (department_name) VALUES (?)", [response.departmentName], function (err, result){
                try {
                    console.log(` ${response.departmentName} added to departments`)
                    mainMenu();
                } catch (error) {
                    console.log(err);
                }
            })
    })

}

function addRole(){
    console.log('add role')
    var rolePrompt = [
        {
            type: 'input',
            name: 'title',
            message: 'what is the new role name?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'what is the new role salary?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'what is the new role\'s department?',
            choices: '',
        },
    ]

    inquirer.prompt( rolePrompt ) 
        .then((response) => {
            
            connection.query("INSERT INTO department (department_name) VALUES (?)", [response.departmentName], function (err, result){
                try {
                    console.log(` ${response.departmentName} added to departments`)
                    mainMenu();
                } catch (error) {
                    console.log(err);
                }
            })
    })
}

function addEmployee(){
    console.log('add employee')
    mainMenu()
}