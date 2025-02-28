MERGE INTO City_Dim cd
USING Headquarters h
ON (cd.City_id = h.City_id)
WHEN MATCHED THEN 
    UPDATE SET cd.City_name = h.City_name, cd.State = h.State
WHEN NOT MATCHED THEN 
    INSERT (City_id, City_name, State) 
    VALUES (h.City_id, h.City_name, h.State);

MERGE INTO Store_Dim sd
USING Stores s
ON (sd.Store_id = s.Store_id)
WHEN MATCHED THEN 
    UPDATE SET sd.City_id = s.City_id, sd.Phone = s.Phone
WHEN NOT MATCHED THEN 
    INSERT (Store_id, City_id, Phone) 
    VALUES (s.Store_id, s.City_id, s.Phone);

MERGE INTO Customer_Dim cd
USING Customer c
ON (cd.Customer_id = c.Customer_id)
WHEN MATCHED THEN 
    UPDATE SET cd.Customer_name = c.Customer_name, cd.City_id = c.City_id, cd.First_order_date = c.First_order_date
WHEN NOT MATCHED THEN 
    INSERT (Customer_id, Customer_name, City_id, First_order_date) 
    VALUES (c.Customer_id, c.Customer_name, c.City_id, c.First_order_date);

MERGE INTO Item_Dim id
USING Items i
ON (id.Item_id = i.Item_id)
WHEN MATCHED THEN 
    UPDATE SET id.Item_Description = i.Item_Description, id.Item_Size = i.Item_Size, id.Item_Weight = i.Item_Weight, id.Unit_price = i.Unit_price
WHEN NOT MATCHED THEN 
    INSERT (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price) 
    VALUES (i.Item_id, i.Item_Description, i.Item_Size, i.Item_Weight, i.Unit_price);
    
INSERT INTO Time_Dim (Time_id, Order_date, Year, Quarter, Month)
SELECT 
    (SELECT COALESCE(MAX(Time_id), 0) FROM Time_Dim) + ROW_NUMBER() OVER (ORDER BY o.Order_date) AS Time_id,
    o.Order_date,
    EXTRACT(YEAR FROM o.Order_date),
    CEIL(EXTRACT(MONTH FROM o.Order_date) / 3), -- Calculate Quarter
    EXTRACT(MONTH FROM o.Order_date)
FROM (SELECT DISTINCT Order_date FROM Orders) o
WHERE NOT EXISTS (SELECT 1 FROM Time_Dim t WHERE t.Order_date = o.Order_date);

select * from time_dim;
    
MERGE INTO Orders_Fact 
USING (
    SELECT o.Order_no, o.Customer_id, o.Order_date, oi.Item_id, oi.Quantity_ordered, oi.Ordered_price, 
           si.Store_id,  -- Pick the first available store
           t.Time_id
    FROM Orders o
    JOIN Ordered_item oi ON o.Order_no = oi.Order_no
    JOIN Time_Dim t ON o.Order_date = t.Order_date
    JOIN (SELECT si.Item_id, si.Store_id 
          FROM Stored_items si 
          WHERE ROWNUM = 1) si ON si.Item_id = oi.Item_id -- Select only one Store_id per Item
) src
ON (Orders_Fact.Order_no = src.Order_no AND Orders_Fact.Item_id = src.Item_id)
WHEN MATCHED THEN 
    UPDATE SET Orders_Fact.Quantity_ordered = src.Quantity_ordered, 
               Orders_Fact.Ordered_price = src.Ordered_price
WHEN NOT MATCHED THEN 
    INSERT (Order_no, Customer_id, Store_id, Item_id, Quantity_ordered, Ordered_price, Time_id) 
    VALUES (src.Order_no, src.Customer_id, src.Store_id, src.Item_id, src.Quantity_ordered, src.Ordered_price, src.Time_id);
    




