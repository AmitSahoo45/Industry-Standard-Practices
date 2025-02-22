CREATE TABLE [dbo].[Orders] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [ProductName] NVARCHAR(100) NOT NULL,
    [Price] DECIMAL(10,2) NOT NULL,
    [CreatedAt] DATETIME NOT NULL DEFAULT GETDATE()
);


EXEC sp_replicationdboption @dbname = N'ParentDB', @optname = N'publish', @value = N'true';

EXEC sp_addpublication @publication = N'ParentDB_pub', @status = N'active', @allow_push = N'true', @sync_method = N'native';;

EXEC sp_addarticle @publication = N'ParentDB_pub', @article = N'Orders', @source_object = N'Orders';

EXEC sp_addsubscription @publication = N'ParentDB_pub', @subscriber = N'(localdb)\ProjectModels', @destination_db = N'testdb', @subscription_type = N'push';