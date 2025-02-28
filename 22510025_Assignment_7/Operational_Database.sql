CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    Phone VARCHAR(15),
    Address VARCHAR(255),
    City VARCHAR(50),
    State VARCHAR(50),
    ZipCode VARCHAR(10),
    RegistrationDate DATE
);

CREATE TABLE Stores (
    StoreID INT PRIMARY KEY,
    StoreName VARCHAR(100),
    City VARCHAR(50),
    State VARCHAR(50)
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10,2)
);

CREATE TABLE Sales (
    InvoiceNumber INT PRIMARY KEY,
    CustomerID INT,
    StoreID INT,
    SalesDate DATE,
    SalesTime TIMESTAMP, -- Fixed the datatype
    SalesPersonID INT,
    TotalAmount DECIMAL(10,2),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (StoreID) REFERENCES Stores(StoreID)
);

select * from sales order by storeid,salesdate;

CREATE TABLE SalesDetails (
    SalesDetailID INT PRIMARY KEY,
    InvoiceNumber INT,
    ProductID INT,
    Quantity INT,
    UnitPrice DECIMAL(10,2),
    TotalPrice DECIMAL(10,2),
    FOREIGN KEY (InvoiceNumber) REFERENCES Sales(InvoiceNumber),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE Employees (
    SalesPersonID INT PRIMARY KEY,
    Name VARCHAR(100),
    StoreID INT,
    Role VARCHAR(50),
    FOREIGN KEY (StoreID) REFERENCES Stores(StoreID)
);







