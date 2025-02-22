-- Hashed Based Sharding Example
-- User Database
CREATE TABLE Users (
	user_id INT PRIMARY KEY IDENTITY(1,1),
	name VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255)
);

-- 4 Tables for Orders - All identical, one for each shard
-- 
-- Shard 0 : Books
CREATE TABLE Orders_0 (
    order_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    status VARCHAR(20),
    INDEX idx_user (user_id)
);

-- Shard 1 : 
CREATE TABLE Orders_1 (
    order_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    status VARCHAR(20),
    INDEX idx_user (user_id)
);

-- Shard 2
CREATE TABLE Orders_2 (
    order_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    status VARCHAR(20),
    INDEX idx_user (user_id)
);

-- Shard 3
CREATE TABLE Orders_3 (
    order_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    status VARCHAR(20),
    INDEX idx_user (user_id)
);