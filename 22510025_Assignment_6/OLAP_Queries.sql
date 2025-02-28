SELECT City_name, State, Store_id, Item_id, SUM(Quantity_ordered) AS Total_Quantity
FROM Orders_Fact 
JOIN Store_Dim USING (Store_id)
JOIN City_Dim USING (City_id)
GROUP BY CUBE (City_name, State, Store_id, Item_id);

SELECT s.Store_id, c.City_name, c.State, s.Phone, i.Item_Description, i.Item_Size, i.Item_Weight, i.Unit_price
FROM Stores s
JOIN City_Dim c ON s.City_id = c.City_id
JOIN Stored_items si ON s.Store_id = si.Store_id
JOIN Item_Dim i ON si.Item_id = i.Item_id
WHERE si.Item_id = :item_id; 

SELECT o.Order_no, c.Customer_name, o.Order_date
FROM Orders o
JOIN Customer_Dim c ON o.Customer_id = c.Customer_id
JOIN Ordered_item oi ON o.Order_no = oi.Order_no
JOIN Stored_items si ON oi.Item_id = si.Item_id
WHERE si.Store_id = :store_id;

SELECT DISTINCT s.Store_id, cd.City_name, s.Phone
FROM Orders o
JOIN Ordered_item oi ON o.Order_no = oi.Order_no
JOIN Stored_items si ON oi.Item_id = si.Item_id
JOIN Stores s ON si.Store_id = s.Store_id
JOIN City_Dim cd ON s.City_id = cd.City_id
WHERE o.Customer_id = :customer_id;

SELECT h.Headquarter_addr, c.City_name, c.State
FROM Headquarters h
JOIN City_Dim c ON h.City_id = c.City_id
JOIN Stores s ON c.City_id = s.City_id
JOIN Stored_items si ON s.Store_id = si.Store_id
WHERE si.Item_id = :item_id AND si.Quantity_held > :stock_threshold;

SELECT o.Order_no, i.Item_Description, s.Store_id, c.City_name
FROM Orders o
JOIN Ordered_item oi ON o.Order_no = oi.Order_no
JOIN Item_Dim i ON oi.Item_id = i.Item_id
JOIN Stored_items si ON oi.Item_id = si.Item_id
JOIN Stores s ON si.Store_id = s.Store_id
JOIN City_Dim c ON s.City_id = c.City_id;

SELECT c.Customer_name, cd.City_name, cd.State
FROM Customer_Dim c
JOIN City_Dim cd ON c.City_id = cd.City_id
WHERE c.Customer_id = :customer_id;

SELECT s.Store_id, SUM(si.Quantity_held) AS Total_Stock
FROM Stored_items si
JOIN Stores s ON si.Store_id = s.Store_id
JOIN City_Dim cd ON s.City_id = cd.City_id
WHERE si.Item_id = :item_id AND cd.City_name = :city_name
GROUP BY s.Store_id;

SELECT o.Order_no, c.Customer_name, i.Item_Description, oi.Quantity_ordered, s.Store_id, cd.City_name
FROM Orders o
JOIN Ordered_item oi ON o.Order_no = oi.Order_no
JOIN Item_Dim i ON oi.Item_id = i.Item_id
JOIN Stored_items si ON oi.Item_id = si.Item_id
JOIN Stores s ON si.Store_id = s.Store_id
JOIN City_Dim cd ON s.City_id = cd.City_id
JOIN Customer_Dim c ON o.Customer_id = c.Customer_id
WHERE o.Order_no = :order_no;

SELECT c.Customer_id, c.Customer_name,
       CASE 
           WHEN w.Customer_id IS NOT NULL AND m.Customer_id IS NOT NULL THEN 'Dual Customer'
           WHEN w.Customer_id IS NOT NULL THEN 'Walk-in Customer'
           WHEN m.Customer_id IS NOT NULL THEN 'Mail-order Customer'
           ELSE 'Unknown'
       END AS Customer_Type
FROM Customer c
LEFT JOIN Walk_in_customers w ON c.Customer_id = w.Customer_id
LEFT JOIN Mail_order_customers m ON c.Customer_id = m.Customer_id;








