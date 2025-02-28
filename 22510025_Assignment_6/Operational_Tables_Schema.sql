CREATE TABLE Customer (
    Customer_id NUMBER PRIMARY KEY,
    Customer_name VARCHAR2(100) NOT NULL,
    City_id NUMBER NOT NULL,
    First_order_date DATE NOT NULL
);

CREATE TABLE Walk_in_customers (
    Customer_id NUMBER PRIMARY KEY,
    Tourism_guide VARCHAR2(100),
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id)
);

CREATE TABLE Mail_order_customers (
    Customer_id NUMBER PRIMARY KEY,
    Post_address VARCHAR2(255) NOT NULL,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id)
);

CREATE TABLE Headquarters (  
    City_id NUMBER PRIMARY KEY,
    City_name VARCHAR2(100) NOT NULL,
    Headquarter_addr VARCHAR2(255) NOT NULL,
    State VARCHAR2(100) NOT NULL,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Stores (
    Store_id NUMBER PRIMARY KEY,
    City_id NUMBER NOT NULL,
    Phone VARCHAR2(20),
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (City_id) REFERENCES Headquarters(City_id)
);

CREATE TABLE Items (
    Item_id NUMBER PRIMARY KEY,
    Item_Description VARCHAR2(255) NOT NULL,  
    Item_Size VARCHAR2(50),   -- Renamed from Size
    Item_Weight NUMBER,       -- Renamed from Weight
    Unit_price NUMBER NOT NULL,
    Created_At DATE DEFAULT SYSDATE  -- Works for DATE type
);

CREATE TABLE Stored_items (
    Store_id NUMBER NOT NULL,
    Item_id NUMBER NOT NULL,
    Quantity_held NUMBER NOT NULL,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Store_id, Item_id),
    FOREIGN KEY (Store_id) REFERENCES Stores(Store_id),
    FOREIGN KEY (Item_id) REFERENCES Items(Item_id)
);

select * from stored_items;

CREATE TABLE Orders (
    Order_no NUMBER PRIMARY KEY,
    Order_date DATE NOT NULL,
    Customer_id NUMBER NOT NULL,
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id)
);

CREATE TABLE Ordered_item (
    Order_no NUMBER NOT NULL,
    Item_id NUMBER NOT NULL,
    Quantity_ordered NUMBER NOT NULL,
    Ordered_price NUMBER NOT NULL,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Order_no, Item_id),
    FOREIGN KEY (Order_no) REFERENCES Orders(Order_no),
    FOREIGN KEY (Item_id) REFERENCES Items(Item_id)
);


