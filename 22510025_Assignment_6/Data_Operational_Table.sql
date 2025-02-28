-- Headquarters Data
INSERT INTO Headquarters (City_id, City_name, Headquarter_addr, State, Time) 
VALUES (1, 'New York', '123 Main St', 'NY', SYSTIMESTAMP);

INSERT INTO Headquarters (City_id, City_name, Headquarter_addr, State, Time) 
VALUES (2, 'Los Angeles', '456 Sunset Blvd', 'CA', SYSTIMESTAMP);

INSERT INTO Headquarters (City_id, City_name, Headquarter_addr, State, Time) 
VALUES (3, 'Chicago', '789 Michigan Ave', 'IL', SYSTIMESTAMP);

INSERT INTO Headquarters (City_id, City_name, Headquarter_addr, State, Time) 
VALUES (4, 'Houston', '101 Texas St', 'TX', SYSTIMESTAMP);

INSERT INTO Headquarters (City_id, City_name, Headquarter_addr, State, Time) 
VALUES (5, 'Miami', '202 Ocean Dr', 'FL', SYSTIMESTAMP);

-- Stores Data
INSERT INTO Stores (Store_id, City_id, Phone, Time) VALUES (101, 1, '212-555-1234', SYSTIMESTAMP);
INSERT INTO Stores (Store_id, City_id, Phone, Time) VALUES (102, 1, '212-555-5678', SYSTIMESTAMP);
INSERT INTO Stores (Store_id, City_id, Phone, Time) VALUES (103, 2, '310-555-1111', SYSTIMESTAMP);
INSERT INTO Stores (Store_id, City_id, Phone, Time) VALUES (104, 2, '310-555-2222', SYSTIMESTAMP);
INSERT INTO Stores (Store_id, City_id, Phone, Time) VALUES (105, 3, '312-555-3333', SYSTIMESTAMP);
INSERT INTO Stores (Store_id, City_id, Phone, Time) VALUES (106, 3, '312-555-4444', SYSTIMESTAMP);
INSERT INTO Stores (Store_id, City_id, Phone, Time) VALUES (107, 4, '713-555-5555', SYSTIMESTAMP);
INSERT INTO Stores (Store_id, City_id, Phone, Time) VALUES (108, 4, '713-555-6666', SYSTIMESTAMP);
INSERT INTO Stores (Store_id, City_id, Phone, Time) VALUES (109, 5, '305-555-7777', SYSTIMESTAMP);
INSERT INTO Stores (Store_id, City_id, Phone, Time) VALUES (110, 5, '305-555-8888', SYSTIMESTAMP);

-- Customer Data
INSERT INTO Customer (Customer_id, Customer_name, City_id, First_order_date) 
VALUES (1, 'Alice Johnson', 1, TO_DATE('2024-01-10', 'YYYY-MM-DD'));

INSERT INTO Customer (Customer_id, Customer_name, City_id, First_order_date) 
VALUES (2, 'Bob Smith', 2, TO_DATE('2024-02-15', 'YYYY-MM-DD'));

INSERT INTO Customer (Customer_id, Customer_name, City_id, First_order_date) 
VALUES (3, 'Charlie Brown', 3, TO_DATE('2024-03-20', 'YYYY-MM-DD'));

INSERT INTO Customer (Customer_id, Customer_name, City_id, First_order_date) 
VALUES (4, 'Diana Ross', 4, TO_DATE('2024-04-25', 'YYYY-MM-DD'));

INSERT INTO Customer (Customer_id, Customer_name, City_id, First_order_date) 
VALUES (5, 'Ethan Hunt', 5, TO_DATE('2024-05-30', 'YYYY-MM-DD'));

-- Walk_In_Customers
INSERT INTO Walk_in_customers (Customer_id, Tourism_guide, Time) VALUES (1, 'Guide A', SYSTIMESTAMP);
INSERT INTO Walk_in_customers (Customer_id, Tourism_guide, Time) VALUES (3, 'Guide B', SYSTIMESTAMP);
INSERT INTO Walk_in_customers (Customer_id, Tourism_guide, Time) VALUES (5, 'Guide C', SYSTIMESTAMP);

-- Mail_Order_Customers
INSERT INTO Mail_order_customers (Customer_id, Post_address, Time) 
VALUES (2, '123 Mail St, Los Angeles, CA', SYSTIMESTAMP);

INSERT INTO Mail_order_customers (Customer_id, Post_address, Time) 
VALUES (4, '456 Postal Ave, Houston, TX', SYSTIMESTAMP);

-- Items 
INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (1, 'Laptop', '15 inch', 2.5, 1200, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (2, 'Smartphone', '6 inch', 0.5, 800, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (3, 'Tablet', '10 inch', 1.0, 600, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (4, 'Smartwatch', '2 inch', 0.2, 300, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (5, 'Headphones', 'Over-Ear', 0.8, 150, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (6, 'Monitor', '27 inch', 5.0, 400, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (7, 'Keyboard', 'Full-size', 1.2, 100, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (8, 'Mouse', 'Standard', 0.3, 50, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (9, 'Printer', 'A4', 6.0, 250, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (10, 'External Hard Drive', '1TB', 0.5, 120, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (11, 'Gaming Console', 'Standard', 4.0, 500, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (12, 'VR Headset', 'Adjustable', 2.0, 350, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (13, 'Speakers', 'Bluetooth', 1.5, 200, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (14, 'Power Bank', '10000mAh', 0.4, 75, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (15, 'Smart TV', '50 inch', 10.0, 1000, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (16, 'Webcam', 'HD 1080p', 0.2, 80, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (17, 'Smart Light Bulb', 'Wi-Fi Enabled', 0.3, 40, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (18, 'Fitness Tracker', 'Adjustable', 0.2, 150, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (19, 'Router', 'Dual-band', 1.0, 130, SYSDATE);

INSERT INTO Items (Item_id, Item_Description, Item_Size, Item_Weight, Unit_price, Created_At) 
VALUES (20, 'Projector', '1080p', 3.0, 600, SYSDATE);

-- Orders
DECLARE 
    v_customer_id NUMBER;
    v_order_date DATE;
BEGIN
    FOR i IN 1001..1100 LOOP  -- Creating 100 orders
        v_customer_id := MOD(i, 5) + 1;  -- Assign customer_id in round-robin

        -- Ensure day has 2 digits by using LPAD
        v_order_date := TO_DATE('2024-06-' || LPAD(MOD(i, 28) + 1, 2, '0'), 'YYYY-MM-DD');  

        INSERT INTO Orders (Order_no, Order_date, Customer_id) 
        VALUES (i, v_order_date, v_customer_id);
    END LOOP;
END;
/

-- Stored_items
DECLARE 
    v_store_id NUMBER;
    v_item_id NUMBER;
    v_quantity NUMBER;
BEGIN
    FOR i IN 101..110 LOOP  -- Each store
        FOR j IN 1..20 LOOP  -- Each item
            v_store_id := i;
            v_item_id := j;
            v_quantity := DBMS_RANDOM.VALUE(10, 60);  -- Random stock between 10-60

            INSERT INTO Stored_items (Store_id, Item_id, Quantity_held, Time) 
            VALUES (v_store_id, v_item_id, TRUNC(v_quantity), SYSTIMESTAMP);
        END LOOP;
    END LOOP;
END;
/

-- Ordered_item
DECLARE 
    v_item_id NUMBER;
    v_quantity NUMBER;
    v_price NUMBER;
    v_used_items DBMS_SQL.NUMBER_TABLE;  -- Collection to store used item IDs
BEGIN
    FOR i IN 1001..1100 LOOP  -- Loop for 100 orders
        v_used_items.DELETE;  -- Clear used items for each order

        FOR j IN 1..3 LOOP  -- Each order gets 3 unique items
            LOOP
                v_item_id := TRUNC(DBMS_RANDOM.VALUE(1, 21));  -- Random item from 1 to 20

                -- Ensure the item is not already used in this order
                EXIT WHEN v_used_items.EXISTS(v_item_id) = FALSE;
            END LOOP;

            v_used_items(v_item_id) := 1;  -- Mark item as used
            v_quantity := TRUNC(DBMS_RANDOM.VALUE(1, 6));  -- Quantity between 1-5
            v_price := v_quantity * (100 + MOD(v_item_id * 20, 200));  -- Calculate price

            INSERT INTO Ordered_item (Order_no, Item_id, Quantity_ordered, Ordered_price, Time) 
            VALUES (i, v_item_id, v_quantity, v_price, SYSTIMESTAMP);
        END LOOP;
    END LOOP;
END;
/





