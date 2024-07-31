-- creating database
CREATE DATABASE Register;

-- using database
use Register; 

--CREATING TABLE 
CREATE TABLE user (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    cedula_ruc VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    fecha_de_nacimiento DATE,
    salario DECIMAL(10, 2),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- tp show all tables
SHOW TABLES; 

-- to describe the table 
describe user; 
