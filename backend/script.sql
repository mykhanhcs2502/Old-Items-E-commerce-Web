DROP TABLE "image";
DROP TABLE "review";
DROP TABLE "purchased_item";
DROP TABLE "item";
DROP TABLE "order";
DROP TABLE "cart";

INSERT INTO "item" (item_name, status, condition, price, description, category_id, seller_id) VALUES ('Macbook Pro 2020', 0, 80, 1000, 'like new', 2, 1);
INSERT INTO "item" (item_name, status, condition, price, description, category_id, seller_id) VALUES ('The Alchemist', 0, 80, 10, 'like new', 1, 2);
INSERT INTO "item" (item_name, status, condition, price, description, category_id, seller_id) VALUES ('Asus 1000', 0, 4, 900, 'gaming laptop', 2, 1);
INSERT INTO "item" (item_name, status, condition, price, description, category_id, seller_id) VALUES ('Dell Inspiron 7490', 0, 80, 2000, 'like new', 2, 1);
INSERT INTO "item" (item_name, status, condition, price, description, category_id, seller_id) VALUES ('Lenovo Thinkpad', 0, 80, 1000, 'like new', 2, 1);
INSERT INTO "item" (item_name, status, condition, price, description, category_id, seller_id) VALUES ('The Lord of the Rings', 0, 80, 50, 'like new', 1, 1);
INSERT INTO "item" (item_name, status, condition, price, description, category_id, seller_id) VALUES ('The Hobbit', 0, 80, 1000, 'like new', 1, 1);

INSERT INTO "image" (item_id, image_type, url) VALUES (1, 'some_type', 'https://i0.wp.com/sixcolors.com/wp-content/uploads/2020/05/13pro-keyboard.jpg?ssl=1');
INSERT INTO "image" (item_id, image_type, url) VALUES (2, 'some_type', 'https://lavenderlotusgifts.com/cdn/shop/products/IMG_2478.jpg?v=1607740677');
INSERT INTO "image" (item_id, image_type, url) VALUES (3, 'some_type', 'https://www.pcworld.com/wp-content/uploads/2023/06/ASUS_ROG_Zephyrus_G14_GA402_1.jpg?quality=50&strip=all');
INSERT INTO "image" (item_id, image_type, url) VALUES (4, 'some_type', 'https://thegioiso365.vn/wp-content/uploads/2021/03/Laptop_DELL_INSPIRON_7490-8.jpg');
INSERT INTO "image" (item_id, image_type, url) VALUES (5, 'some_type', 'https://laptoptld.com/wp-content/uploads/2022/06/Laptop-Lenovo-Thinkpad-X1-Carbon-Gen-7-COREI5-1.jpg');
INSERT INTO "image" (item_id, image_type, url) VALUES (6, 'some_type', 'https://assets-prd.ignimgs.com/2022/10/04/untitled-design-2-1664896904846.png');
INSERT INTO "image" (item_id, image_type, url) VALUES (7, 'some_type', 'https://assets-prd.ignimgs.com/2023/03/21/the-hobbit-illustrated-blogroll-1679423874164.png');

INSERT INTO "order" (date, buyer_id) VALUES ('2023-10-04T14:03:18.915Z', 2);
INSERT INTO "order" (date, buyer_id) VALUES ('2023-08-20T14:03:18.915Z', 2);
INSERT INTO "order" (date, buyer_id) VALUES ('2022-06-15T14:03:18.915Z', 3);

UPDATE "item" SET status=1, buyer_id=2, order_id=1 WHERE id=4;
UPDATE "item" SET status=1, buyer_id=2, order_id=1 WHERE id=5;
UPDATE "item" SET status=1, buyer_id=2, order_id=2 WHERE id=6;
UPDATE "item" SET status=1, buyer_id=3, order_id=3 WHERE id=7;

INSERT INTO "review" (star, comment, review_date, item_id, buyer_id) VALUES (5, 'good', '2023-10-05T14:03:18.915Z', 4, 2);
INSERT INTO "review" (star, comment, review_date, item_id, buyer_id) VALUES (3, 'nice', '2023-08-21T14:03:18.915Z', 6, 2);

INSERT INTO "cart" (user_id, item_id) VALUES (6, 1);
INSERT INTO "cart" (user_id, item_id) VALUES (6, 2);

-- INSERT INTO "purchased_item" (order_id, item_id) VALUES (1, 22);
-- INSERT INTO "purchased_item" (order_id, item_id) VALUES (1, 23);
-- INSERT INTO "purchased_item" (order_id, item_id) VALUES (2, 24);
-- INSERT INTO "purchased_item" (order_id, item_id) VALUES (3, 25);


