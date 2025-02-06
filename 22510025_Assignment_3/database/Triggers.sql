USE assignment3;

DELIMITER $$

CREATE TRIGGER create_student_user
AFTER INSERT ON student
FOR EACH ROW
BEGIN
    INSERT INTO users (username, password, role_id, student_id)
    VALUES (CONCAT(NEW.name, '_', NEW.ID), NEW.ID, 4, NEW.ID);
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER create_teacher_user
AFTER INSERT ON instructor
FOR EACH ROW
BEGIN
    INSERT INTO users (username, password, role_id, instructor_id)
    VALUES (CONCAT(NEW.name, '_', NEW.ID), NEW.ID, 3, NEW.ID);
END $$

DELIMITER ;

SHOW TRIGGERS IN assignment3;


