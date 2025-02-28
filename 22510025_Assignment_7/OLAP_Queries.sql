SELECT s.StoreName, p.ProductName, d.Month, d.Year, 
       SUM(f.TotalSales) AS TotalRevenue
FROM FactSales f
JOIN DimStore s ON f.StoreID = s.StoreID
JOIN DimProduct p ON f.ProductID = p.ProductID
JOIN DimDate d ON f.SalesDateKey = d.DateKey
GROUP BY CUBE (s.StoreName, p.ProductName, d.Month, d.Year)
ORDER BY s.StoreName, p.ProductName, d.Year, d.Month;

-- Summarizing Sales by Year
SELECT d.Year, d.Month, SUM(f.TotalSales) AS MonthlyRevenue
FROM FactSales f
JOIN DimDate d ON f.SalesDateKey = d.DateKey
GROUP BY ROLLUP (d.Year, d.Month)
ORDER BY d.Year, d.Month;

-- Sales Trends
SELECT d.Year, d.Quarter, d.Month, SUM(f.TotalSales) AS TotalRevenue
FROM FactSales f
JOIN DimDate d ON f.SalesDateKey = d.DateKey
GROUP BY CUBE (d.Year, d.Quarter, d.Month)
ORDER BY d.Year, d.Quarter, d.Month;

-- Store wise Product Performance
SELECT s.StoreName, p.ProductName, SUM(f.TotalSales) AS Revenue
FROM FactSales f
JOIN DimStore s ON f.StoreID = s.StoreID
JOIN DimProduct p ON f.ProductID = p.ProductID
GROUP BY CUBE (s.StoreName, p.ProductName)
ORDER BY s.StoreName, p.ProductName;

-- Daily sales for given month
SELECT d.Year, d.Month, d.Day, SUM(f.TotalSales) AS DailySales
FROM FactSales f
JOIN DimDate d ON f.SalesDateKey = d.DateKey
WHERE d.Year = 2024 AND d.Month = 3  -- March 2024
GROUP BY d.Year, d.Month, d.Day
ORDER BY d.Year, d.Month, d.Day;

-- Comparison Weekday vs Weekend
SELECT d.Weekday, SUM(f.TotalSales) AS TotalSales
FROM FactSales f
JOIN DimDate d ON f.SalesDateKey = d.DateKey
GROUP BY d.Weekday
ORDER BY TotalSales DESC;

-- Monthly revenue for each store
SELECT s.StoreName, d.Year, d.Month, SUM(f.TotalSales) AS MonthlyRevenue
FROM FactSales f
JOIN DimStore s ON f.StoreID = s.StoreID
JOIN DimDate d ON f.SalesDateKey = d.DateKey
GROUP BY ROLLUP (s.StoreName, d.Year, d.Month)
ORDER BY s.StoreName, d.Year, d.Month;

-- Sales distribution by time of day
SELECT t.TimeOfDay, SUM(f.TotalSales) AS SalesAmount
FROM FactSales f
JOIN DimTime t ON f.SalesTimeKey = t.TimeKey
GROUP BY t.TimeOfDay
ORDER BY SalesAmount DESC;

-- Sales growth over time
SELECT d.Year, d.Quarter, SUM(f.TotalSales) AS QuarterlyRevenue
FROM FactSales f
JOIN DimDate d ON f.SalesDateKey = d.DateKey
GROUP BY ROLLUP (d.Year, d.Quarter)
ORDER BY d.Year, d.Quarter;
