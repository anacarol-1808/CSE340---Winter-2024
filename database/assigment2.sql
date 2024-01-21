-- 1. Insert the following new record to the account table
-- The account_id and account_type fields should handle their own values and do not need to be part of this query.
INSERT INTO account 
(account_firstname, account_lastname, account_email, account_password)
VALUES 
('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


-- 2. Modify the Tony Stark record to change the account_type to "Admin".
UPDATE account
SET account_type = 'Admin'
WHERE account_id = 1;

-- 3. Delete the Tony Stark record from the database.
DELETE FROM account WHERE account_id = 1;

-- 4. Modify the "GM Hummer" record to read "a huge interior" rather than "small interiors" using a single query. 
-- Explore the PostgreSQL Replace function 
-- Do NOT retype the entire description as part of the query.. 
-- It needs to be part of an Update query as shown in the code examples of the SQL Reading - Read Ch. 1, section 3.
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';


-- 5. Use an inner join to select the make and model fields from the inventory table and 
-- the classification name field from the classification table for inventory items that 
-- belong to the "Sport" category. 
-- These resources may help you: https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-joins/. 
-- Two records should be returned as a result of the query.
SELECT cl.classification_name, inv_make, inv_model 
FROM inventory inv
JOIN classification cl
	ON cl.classification_id = inv.classification_id
WHERE cl.classification_name = 'Sport';

-- 6. Update all records in the inventory table to add "/vehicles" to the 
-- middle of the file path in the inv_image and inv_thumbnail columns using a single query. 
-- This reference may prove helpful - https://www.postgresqltutorial.com/postgresql-string-functions/postgresql-replace/. 
-- When done the path for both inv_image and inv_thumbnail should resemble this example: /images/vehicles/a-car-name.jpg
UPDATE inventory
SET inv_image = REPLACE (inv_image, '/images', '/images/vehicles');

-- 7. When done with the 6th query, copy and paste it into the assignment 2 file. 
-- In addition to this, add the 6th query to the bottom of the file you created to 
-- rebuild your database. Make sure it is the last thing to run when that file is complete. 
-- By the end you should have two files - one with the 6 queries from Task 1, and the second 
-- with all the queries to rebuild your database, along with the 6th query from Task 1.

