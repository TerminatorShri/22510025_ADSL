-- Object Relational Databases
-- 1) Create Object Table with field name and a member function to count number of words in field 'name'
CREATE OR REPLACE TYPE ObjectType AS OBJECT (
    name VARCHAR2(50),
    MEMBER FUNCTION countNoOfWords RETURN NUMBER
);

CREATE OR REPLACE TYPE BODY ObjectType AS
    MEMBER FUNCTION countNoOfWords RETURN NUMBER IS
        word_count NUMBER := 0;
    BEGIN
        word_count := LENGTH(TRIM(name)) - LENGTH(REPLACE(TRIM(name), ' ', '')) + 1;
        
        IF TRIM(name) IS NULL THEN
            word_count := 0;
        END IF;
        
        RETURN word_count;
    END countNoOfWords;
END;
/

CREATE TABLE ObjectTable OF ObjectType;

INSERT INTO ObjectTable VALUES (ObjectType('Shreeyash Dongarkar'));
INSERT INTO ObjectTable VALUES (ObjectType('Shreeyash Shripad Dongarkar'));
INSERT INTO ObjectTable VALUES (ObjectType('Shreeyash'));
INSERT INTO ObjectTable VALUES (ObjectType(' '));

SELECT t.name, t.countNoOfWords() AS word_count
FROM ObjectTable t;

-- 2) Create an address type with attributes address, city, state and pincode and also add 2 member functions to extract address based on given keyword and count number of words in each given field
CREATE OR REPLACE TYPE AddressType AS OBJECT (
    address VARCHAR2(200),
    city VARCHAR2(100),
    state VARCHAR2(100),
    pincode VARCHAR2(10),
    
    MEMBER FUNCTION extractAddressesByKeyword(keyword VARCHAR2) RETURN VARCHAR2,
    MEMBER FUNCTION countWordsInField(fieldName VARCHAR2) RETURN NUMBER
);

CREATE OR REPLACE TYPE BODY AddressType AS
    MEMBER FUNCTION extractAddressesByKeyword(keyword VARCHAR2) RETURN VARCHAR2 IS
    BEGIN
        IF INSTR(LOWER(address), LOWER(keyword)) > 0 THEN
            RETURN address;
        ELSE
            RETURN NULL;
        END IF;
    END extractAddressesByKeyword;

    MEMBER FUNCTION countWordsInField(fieldName VARCHAR2) RETURN NUMBER IS
        fieldValue VARCHAR2(200);
        wordCount NUMBER := 0;
    BEGIN
        CASE LOWER(fieldName)
            WHEN 'address' THEN fieldValue := address;
            WHEN 'city' THEN fieldValue := city;
            WHEN 'state' THEN fieldValue := state;
            WHEN 'pincode' THEN fieldValue := pincode;
            ELSE
                RAISE_APPLICATION_ERROR(-20001, 'Invalid field name provided');
        END CASE;

        fieldValue := TRIM(fieldValue);
        IF fieldValue IS NOT NULL THEN
            wordCount := LENGTH(fieldValue) - LENGTH(REPLACE(fieldValue, ' ', '')) + 1;
        END IF;

        RETURN wordCount;
    END countWordsInField;

END;
/

CREATE TABLE AddressTable OF AddressType;

INSERT INTO AddressTable VALUES (
    AddressType('12 MG Road', 'Pune', 'Maharashtra', '411001')
);
INSERT INTO AddressTable VALUES (
    AddressType('45 Gandhi Nagar', 'Delhi', 'Delhi', '110001')
);
INSERT INTO AddressTable VALUES (
    AddressType('78 Anna Salai', 'Chennai', 'Tamil Nadu', '600002')
);
INSERT INTO AddressTable VALUES (
    AddressType('123 Brigade Road', 'Bengaluru', 'Karnataka', '560001')
);

SELECT t.extractAddressesByKeyword('Gandhi') AS extracted_address
FROM AddressTable t
WHERE t.extractAddressesByKeyword('Gandhi') IS NOT NULL;

SELECT t.address, t.city, t.state, t.pincode, 
       t.countWordsInField('address') AS address_word_count,
       t.countWordsInField('city') AS city_word_count,
       t.countWordsInField('state') AS state_word_count,
       t.countWordsInField('pincode') AS pincode_word_count
FROM AddressTable t;

-- 3) Create a type CourseType with fields with course_id, description fields and create object table based on it 
CREATE OR REPLACE TYPE CourseType AS OBJECT (
    course_id VARCHAR2(20),
    description VARCHAR2(200)
);

CREATE TABLE CourseTable OF CourseType;

INSERT INTO CourseTable VALUES (CourseType('CS101', 'Introduction to Computer Science'));
INSERT INTO CourseTable VALUES (CourseType('CS102', 'Data Structures and Algorithms'));
INSERT INTO CourseTable VALUES (CourseType('CS201', 'Database Management Systems'));
INSERT INTO CourseTable VALUES (CourseType('CS301', 'Operating Systems'));
INSERT INTO CourseTable VALUES (CourseType('CS400', 'Machine Learning'));

SELECT c.course_id, c.description
FROM CourseTable c;




