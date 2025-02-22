DECLARE @User_id INT = 12345;
DECLARE @Shard_Index INT;

-- CREATING A SIMPLE HASH FUNCTION BASED ON user_id, that determines the target shard. 
-- This is a simple example, in real world, you would have a more complex hash function.

SET @Shard_Index = @User_id % 4;

-- Now, we can use the @Shard_Index to determine the target shard for the user_id 12345
-- We can use this to route the query to the correct shard.

IF @Shard_Index = 0
BEGIN
	-- Shard 0
	INSERT INTO Orders_0 (user_id, total_amount, status)
	VALUES (@User_id, 100.00, 'Pending');
END
ELSE IF @Shard_Index = 1
BEGIN
	-- Shard 1
	INSERT INTO Orders_1 (user_id, total_amount, status)
	VALUES (@User_id, 100.00, 'Pending');
END
ELSE IF @Shard_Index = 2
BEGIN
	-- Shard 2
	INSERT INTO Orders_2 (user_id, total_amount, status)
	VALUES (@User_id, 100.00, 'Pending');
END
ELSE IF @Shard_Index = 3
BEGIN
	-- Shard 3
	INSERT INTO Orders_3 (user_id, total_amount, status)
	VALUES (@User_id, 100.00, 'Pending');
END
ELSE
BEGIN
	-- This should never happen, but just in case
	RAISERROR('Invalid Shard Index', 16, 1);
END

DECLARE @Shard_Table NVARCHAR(50);
SET @Shard_Table = 'Orders_' + CAST(@Shard_Index AS NVARCHAR(10));

SELECT * FROM Orders_1;