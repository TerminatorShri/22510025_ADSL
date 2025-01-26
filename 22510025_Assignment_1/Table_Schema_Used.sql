-- Database name : Assignments

CREATE TABLE with_auto_increment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE without_auto_increment (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO with_auto_increment (name) VALUES 
('Alice'),
('Bob'),
('Charlie'),
('Diana');

INSERT INTO without_auto_increment (id, name) VALUES 
(101, 'Eve'),
(102, 'Frank'),
(103, 'Grace'),
(104, 'Henry');


