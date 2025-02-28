MERGE INTO DimCustomer dc
USING (
    SELECT 
        CustomerID, 
        Name, 
        City, 
        State 
    FROM 
        Customers
) src
ON (dc.CustomerID = src.CustomerID)
WHEN MATCHED THEN
    UPDATE SET
        dc.Name = src.Name,
        dc.City = src.City,
        dc.State = src.State
WHEN NOT MATCHED THEN
    INSERT (CustomerID, Name, City, State)
    VALUES (src.CustomerID, src.Name, src.City, src.State);
    
MERGE INTO DimStore ds
USING (
    SELECT 
        StoreID, 
        StoreName, 
        City, 
        State 
    FROM 
        Stores
) src
ON (ds.StoreID = src.StoreID)
WHEN MATCHED THEN
    UPDATE SET
        ds.StoreName = src.StoreName,
        ds.City = src.City,
        ds.State = src.State
WHEN NOT MATCHED THEN
    INSERT (StoreID, StoreName, City, State)
    VALUES (src.StoreID, src.StoreName, src.City, src.State);
    
MERGE INTO DimProduct dp
USING (
    SELECT 
        ProductID, 
        ProductName, 
        Category 
    FROM 
        Products
) src
ON (dp.ProductID = src.ProductID)
WHEN MATCHED THEN
    UPDATE SET
        dp.ProductName = src.ProductName,
        dp.Category = src.Category
WHEN NOT MATCHED THEN
    INSERT (ProductID, ProductName, Category)
    VALUES (src.ProductID, src.ProductName, src.Category);
    
MERGE INTO DimDate dd
USING (
    SELECT 
        DISTINCT SalesDate AS DateKey, -- Add DISTINCT here
        EXTRACT(DAY FROM SalesDate) AS Day, 
        EXTRACT(MONTH FROM SalesDate) AS Month, 
        EXTRACT(YEAR FROM SalesDate) AS Year, 
        TO_CHAR(SalesDate, 'Q') AS Quarter, 
        TO_CHAR(SalesDate, 'Day') AS Weekday
    FROM 
        Sales
) src
ON (dd.DateKey = src.DateKey)
WHEN MATCHED THEN
    UPDATE SET
        dd.Day = src.Day,
        dd.Month = src.Month,
        dd.Year = src.Year,
        dd.Quarter = src.Quarter,
        dd.Weekday = src.Weekday
WHEN NOT MATCHED THEN
    INSERT (DateKey, Day, Month, Year, Quarter, Weekday)
    VALUES (src.DateKey, src.Day, src.Month, src.Year, src.Quarter, src.Weekday);
    
MERGE INTO DimTime dt
USING (
    SELECT 
        DISTINCT SalesTime AS TimeKey, -- Add DISTINCT here
        EXTRACT(HOUR FROM SalesTime) AS Hour, 
        EXTRACT(MINUTE FROM SalesTime) AS Minute, 
        CASE 
            WHEN EXTRACT(HOUR FROM SalesTime) BETWEEN 6 AND 12 THEN 'Morning'
            WHEN EXTRACT(HOUR FROM SalesTime) BETWEEN 12 AND 18 THEN 'Afternoon'
            WHEN EXTRACT(HOUR FROM SalesTime) BETWEEN 18 AND 24 THEN 'Evening'
            ELSE 'Night'
        END AS TimeOfDay
    FROM 
        Sales
) src
ON (dt.TimeKey = src.TimeKey)
WHEN MATCHED THEN
    UPDATE SET
        dt.Hour = src.Hour,
        dt.Minute = src.Minute,
        dt.TimeOfDay = src.TimeOfDay
WHEN NOT MATCHED THEN
    INSERT (TimeKey, Hour, Minute, TimeOfDay)
    VALUES (src.TimeKey, src.Hour, src.Minute, src.TimeOfDay);
    
MERGE INTO DimSalesPerson dsp
USING (
    SELECT 
        SalesPersonID, 
        Name, 
        StoreID 
    FROM 
        Employees
) src
ON (dsp.SalesPersonID = src.SalesPersonID)
WHEN MATCHED THEN
    UPDATE SET
        dsp.Name = src.Name,
        dsp.StoreID = src.StoreID
WHEN NOT MATCHED THEN
    INSERT (SalesPersonID, Name, StoreID)
    VALUES (src.SalesPersonID, src.Name, src.StoreID);
    
MERGE INTO FactSales fs
USING (
    SELECT 
        sd.SalesDetailID AS SalesID, -- Use SalesDetailID for uniqueness
        s.SalesDate AS SalesDateKey, 
        s.SalesTime AS SalesTimeKey, 
        s.InvoiceNumber, 
        s.SalesPersonID, 
        s.StoreID, 
        s.CustomerID, 
        sd.ProductID, 
        sd.Quantity, 
        sd.UnitPrice AS ActualCost, 
        sd.TotalPrice AS TotalSales
    FROM 
        Sales s
    JOIN 
        SalesDetails sd ON s.InvoiceNumber = sd.InvoiceNumber
) src
ON (fs.SalesID = src.SalesID)
WHEN MATCHED THEN
    UPDATE SET
        fs.SalesDateKey = src.SalesDateKey,
        fs.SalesTimeKey = src.SalesTimeKey,
        fs.InvoiceNumber = src.InvoiceNumber,
        fs.SalesPersonID = src.SalesPersonID,
        fs.StoreID = src.StoreID,
        fs.CustomerID = src.CustomerID,
        fs.ProductID = src.ProductID,
        fs.Quantity = src.Quantity,
        fs.ActualCost = src.ActualCost,
        fs.TotalSales = src.TotalSales
WHEN NOT MATCHED THEN
    INSERT (SalesID, SalesDateKey, SalesTimeKey, InvoiceNumber, SalesPersonID, StoreID, CustomerID, ProductID, Quantity, ActualCost, TotalSales)
    VALUES (src.SalesID, src.SalesDateKey, src.SalesTimeKey, src.InvoiceNumber, src.SalesPersonID, src.StoreID, src.CustomerID, src.ProductID, src.Quantity, src.ActualCost, src.TotalSales);
    
    
