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
            message: 'Select action, CTRL+C to exit',
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

    .then((response) => {
        switch (response.mainMenu) {
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
                 console.log("inquirer error")
                break;
        }
    })
}

function viewDepartments(){
    // console.log('view departments')
    connection.query('SELECT * FROM department;', function (err, results){
        if (err) {
            console.log("viewDepartments() error:", err)
        }
        console.table(results)
        mainMenu()
    }) 

}

function viewRoles(){
    // console.log('view roles')
    connection.query('SELECT * FROM roles;', function (err, results){
        if (err) {
            console.log("viewRoles() error:", err)
        }
        console.table(results)
        mainMenu()
    })
}

function viewEmployees(){
    // console.log('view emplyeee')
    connection.query('SELECT * FROM employee;', function (err, results){
        if (err) {
            console.log("viewEmployees() error:", err)
        }
        console.table(results)
        mainMenu()
    })
}

function addDepartment(){
    // console.log('add department')

    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'what is the new department name?'
        }
    ]) 
    .then((response) => {
        
        connection.query("INSERT INTO department (department_name) VALUES (?)", [response.departmentName], function (err, result){
            if (err) {
                console.log("addDepartment() error:", err);
            }
            console.log(` ${response.departmentName} added to departments`)
            mainMenu();
        })
    })

}

async function addRole(){
    // console.log('add role');

    // gether departments to select from
    const departments = await connection.promise().query("SELECT * FROM department;")
    // console.log("raw departtments", departments)
    // console.log("raw departtments arr", departments[0])
    const allDepartments = departments[0].map(department => ({name:department.department_name, value: department.id }))
    // console.log("mapped departmetns", allDepartments) //undefined

    inquirer.prompt([
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
            choices: allDepartments,
        },
    ]) 
    .then((response) => {
        
        // ( "query" , value , function to run after query )
        connection.query(
            "INSERT INTO roles SET ?",

            {role_title: response.title,
            role_salary: response.salary,
            department_id: response.department }, 
        
            function (err, result){
                if (err) {
                    console.log("addRole() error:", err);
                }
                console.log(`${response.title} added to roles`)
                mainMenu();
            })
    })
}

async function addEmployee(){
    console.log('add employee')

    const roles = await connection.promise().query("SELECT * FROM roles;")
    const allRoles = roles[0].map(role => ({ name: role.role_title, value: role.id }))

    const managers = await connection.promise().query("SELECT * FROM employee;")
    const allManagers = managers[0].map(manager => ({ name: manager.first_name + ' ' + manager.last_name, value: manager.id }))
    
    console.log(allRoles, allManagers)


    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'what is the Employee\'s first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'what is the Employee\'s last name?'
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'what is the new Employees\'s Role?',
            choices: allRoles,
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: 'what is the new Employees\'s Manager?',
            choices: allManagers,
        },
    ]) 
    .then((response) => {
        
        connection.query(
            "INSERT INTO employee SET ?",

            {first_name: response.firstName,
            last_name: response.lastName,
            role_id: response.employeeRole,
            manager_id: response.employeeManager }, 
        
            function (err, result){
                if (err) {
                    console.log("addEmployee() error:", err)
                }
                console.log(`${response.firstName} added to employee`)
                mainMenu();

                
            })
    })
}