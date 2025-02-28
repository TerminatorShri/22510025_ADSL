INSERT INTO Stores (StoreID, StoreName, City, State)
SELECT LEVEL, 
       'Store_' || LEVEL, 
       CASE MOD(LEVEL, 5) 
            WHEN 0 THEN 'New York' 
            WHEN 1 THEN 'Los Angeles' 
            WHEN 2 THEN 'Chicago' 
            WHEN 3 THEN 'Houston' 
            ELSE 'Miami' END,
       'USA'
FROM DUAL CONNECT BY LEVEL <= 10;

INSERT INTO Customers (CustomerID, Name, Email, Phone, Address, City, State, ZipCode, RegistrationDate)
SELECT LEVEL, 
       'Customer_' || LEVEL, 
       'customer' || LEVEL || '@example.com',
       '+1' || LPAD(TRUNC(DBMS_RANDOM.VALUE(1000000000, 9999999999)), 10, '0'),
       'Address_' || LEVEL,
       CASE MOD(LEVEL, 5) 
            WHEN 0 THEN 'New York' 
            WHEN 1 THEN 'Los Angeles' 
            WHEN 2 THEN 'Chicago' 
            WHEN 3 THEN 'Houston' 
            ELSE 'Miami' END,
       'USA', 
       LPAD(TRUNC(DBMS_RANDOM.VALUE(10000, 99999)), 5, '0'),
       TRUNC(SYSDATE - DBMS_RANDOM.VALUE(1, 1000))
FROM DUAL CONNECT BY LEVEL <= 50;

INSERT INTO Products (ProductID, ProductName, Category, Price)
SELECT LEVEL, 
       'Product_' || LEVEL, 
       CASE MOD(LEVEL, 4) 
            WHEN 0 THEN 'Electronics' 
            WHEN 1 THEN 'Clothing' 
            WHEN 2 THEN 'Grocery' 
            ELSE 'Furniture' END, 
       ROUND(DBMS_RANDOM.VALUE(10, 500), 2)
FROM DUAL CONNECT BY LEVEL <= 30;

INSERT INTO Employees (SalesPersonID, Name, StoreID, Role)
SELECT LEVEL, 
       'SalesPerson_' || LEVEL, 
       TRUNC(DBMS_RANDOM.VALUE(1, 10)), 
       'Sales Associate'
FROM DUAL CONNECT BY LEVEL <= 20;

INSERT INTO Sales (InvoiceNumber, CustomerID, StoreID, SalesDate, SalesTime, SalesPersonID, TotalAmount)
SELECT LEVEL, 
       TRUNC(DBMS_RANDOM.VALUE(1, 50)), 
       TRUNC(DBMS_RANDOM.VALUE(1, 10)), 
       TRUNC(SYSDATE - DBMS_RANDOM.VALUE(1, 365)), 
       TO_TIMESTAMP(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(0, 23)), '00') || ':' || 
                    TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(0, 59)), '00'), 'HH24:MI'), 
       TRUNC(DBMS_RANDOM.VALUE(1, 20)), 
       ROUND(DBMS_RANDOM.VALUE(20, 1000), 2)
FROM DUAL CONNECT BY LEVEL <= 200;

INSERT INTO SalesDetails (SalesDetailID, InvoiceNumber, ProductID, Quantity, UnitPrice, TotalPrice)
SELECT LEVEL, 
       TRUNC(DBMS_RANDOM.VALUE(1, 200)), 
       TRUNC(DBMS_RANDOM.VALUE(1, 30)), 
       TRUNC(DBMS_RANDOM.VALUE(1, 5)), 
       ROUND(DBMS_RANDOM.VALUE(10, 500), 2),
       ROUND(DBMS_RANDOM.VALUE(20, 2000), 2)
FROM DUAL CONNECT BY LEVEL <= 400;







