-- Seeding queries reference EMPLOYEE_MGMT
USE EMPLOYEE_MGMT;
-- Seeding departments table
INSERT INTO `department` VALUES
('1','Marketing'),
('2','Finance'),
('3','Human Resources'),
('4','Production'),
('5','Development'),
('6','Quality Management'),
('7','Sales'),
('8','Research'),
('9','Customer Service');

-- Seeding roles table
INSERT INTO `role` VALUES
('1','Administrator','38000','9'),
('2','Engineer I','70500','8'),
('3','Senior Technician','63000','5'),
('4','Master Technician','68000','6'),
('5','Senior Engineer','90000','9'),
('6','Sales Person','50000','7'),
('7','Specialist','48000','4'),
('8','Professional','650000','4'),
('9','Staff Engineer','100000','5'),
('10','Sales Lead','100000','7');

-- Seeding employees table
INSERT INTO `employee` VALUES
('1','Tasha','Molina','10',null),
('2','Basia','Bruce','6','1'),
('3','Anastasia','Montgomery','6','1'),
('4','Kamal','Hobbs','9',null),
('5','Christine','Dillard','2','4'),
('6','Philip','Holmes','5','4'),
('7','Kylynn','Marsh','4',null),
('8','Eugenia','Vaughn','3','7'),
('9','Wade','Conley','1','1'),
('10','Meghan','Coleman','8',null),
('11','Ryan','Cole','7','10');