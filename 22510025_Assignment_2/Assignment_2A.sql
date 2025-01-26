USE ASSIGNMENTS;

-- PERSISTENT STORED MODULES REVIEW 
-- 1) Write a procedure to insert 50 records in test_table having columns RecordNumber and CurrentDate
CREATE TABLE IF NOT EXISTS test_table (
    RecordNumber INT, 
    CurrentDate DATE  
);

DELIMITER $$

CREATE PROCEDURE InsertRecords()
BEGIN
    DECLARE i INT DEFAULT 1;  
    DECLARE currentDate DATE;  
    SET currentDate = CURDATE();  

    WHILE i <= 50 DO
        INSERT INTO test_table (RecordNumber, CurrentDate)
        VALUES (i, currentDate);  
        SET i = i + 1;  
    END WHILE;
END$$

DELIMITER ;

CALL InsertRecords();

SELECT * FROM test_table;

-- 2) Procedure with two arguments X and Y which will increase price by X% for all products having category Y and here X and Y will be given by user through input.
CREATE TABLE IF NOT EXISTS products (
    ProductID INT,
    category CHAR(3),
    detail VARCHAR(30),
    price DECIMAL(10, 2),
    stock INT
);

INSERT INTO products (ProductID, category, detail, price, stock) 
VALUES
    (1, 'A01', 'Product A', 100.00, 10),
    (2, 'A01', 'Product B', 150.00, 5),
    (3, 'B01', 'Product C', 200.00, 15),
    (4, 'B01', 'Product D', 250.00, 20);
    
SELECT * FROM products;

DELIMITER $$

DROP PROCEDURE IF EXISTS IncreasePrice$$

CREATE PROCEDURE IncreasePrice(IN X DECIMAL(5,2), IN Y CHAR(3))
BEGIN
    UPDATE products
    SET price = price + (price * X / 100)
    WHERE category = Y AND ProductID IS NOT NULL;
END$$

DELIMITER ;

CALL IncreasePrice(10, 'A01');

SELECT * FROM products;









