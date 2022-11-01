INSERT INTO department (id, department_name)
VALUES (68, 'Film'),(419, 'Entrepreneur')

INSERT INTO roles (role_title, role_salary, department_id)
VALUES ('photographer', 10, 68),('bud tender', 8, 419)

INSERT INTO employee (first_name, last_name , role_id, manager_id)
VALUES ('Mike','Hawk', 1, null),('Mary','Jane', 2, 1)