CREATE TABLE City_Dim (
    City_id NUMBER PRIMARY KEY,
    City_name VARCHAR2(100),
    State VARCHAR2(100)
);

CREATE TABLE Store_Dim (
    Store_id NUMBER PRIMARY KEY,
    City_id NUMBER REFERENCES City_Dim(City_id),
    Phone VARCHAR2(20)
);

CREATE TABLE Customer_Dim (
    Customer_id NUMBER PRIMARY KEY,
    Customer_name VARCHAR2(100),
    City_id NUMBER REFERENCES City_Dim(City_id),
    First_order_date DATE,
    Customer_Type VARCHAR2(20) -- 'Walk-in', 'Mail-order', 'Both'
);

CREATE TABLE Item_Dim (
    Item_id NUMBER PRIMARY KEY,
    Item_Description VARCHAR2(255),
    Item_Size VARCHAR2(50),
    Item_Weight NUMBER,
    Unit_price NUMBER
);

CREATE TABLE Time_Dim (
    Time_id NUMBER PRIMARY KEY,
    Order_date DATE,
    Year NUMBER,
    Quarter NUMBER,
    Month NUMBER
);

CREATE TABLE Orders_Fact (
    Order_no NUMBER PRIMARY KEY,
    Customer_id NUMBER REFERENCES Customer_Dim(Customer_id),
    Store_id NUMBER REFERENCES Store_Dim(Store_id),
    Item_id NUMBER REFERENCES Item_Dim(Item_id),
    Quantity_ordered NUMBER,
    Ordered_price NUMBER,
    Time_id NUMBER REFERENCES Time_Dim(Time_id)
);




