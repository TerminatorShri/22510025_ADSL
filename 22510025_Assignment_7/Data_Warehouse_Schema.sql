CREATE TABLE DimProduct (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Category VARCHAR(50)
);

CREATE TABLE DimCustomer (
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100),
    City VARCHAR(50),
    State VARCHAR(50)
);

CREATE TABLE DimStore (
    StoreID INT PRIMARY KEY,
    StoreName VARCHAR(100),
    City VARCHAR(50),
    State VARCHAR(50)
);

CREATE TABLE DimDate (
    DateKey DATE PRIMARY KEY,  
    Day INT,
    Month INT,
    Year INT,
    Quarter INT,
    Weekday VARCHAR(10)
);

CREATE TABLE DimTime (
    TimeKey TIMESTAMP PRIMARY KEY,
    Hour INT,
    Minute INT,
    TimeOfDay VARCHAR(20)  -- Morning, Afternoon, Evening, Night
);

CREATE TABLE DimSalesPerson (
    SalesPersonID INT PRIMARY KEY,
    Name VARCHAR(100),
    StoreID INT,
    FOREIGN KEY (StoreID) REFERENCES DimStore(StoreID)
);

CREATE TABLE FactSales (
    SalesID INT PRIMARY KEY,  
    SalesDateKey DATE,  
    SalesTimeKey TIMESTAMP,  
    InvoiceNumber INT,  
    SalesPersonID INT,  
    StoreID INT,  
    CustomerID INT,  
    ProductID INT,  
    Quantity INT,  
    ActualCost DECIMAL(10,2),  
    TotalSales DECIMAL(10,2),  
    FOREIGN KEY (SalesDateKey) REFERENCES DimDate(DateKey),
    FOREIGN KEY (SalesTimeKey) REFERENCES DimTime(TimeKey),
    FOREIGN KEY (StoreID) REFERENCES DimStore(StoreID),
    FOREIGN KEY (CustomerID) REFERENCES DimCustomer(CustomerID),
    FOREIGN KEY (ProductID) REFERENCES DimProduct(ProductID),
    FOREIGN KEY (SalesPersonID) REFERENCES DimSalesPerson(SalesPersonID)
);









