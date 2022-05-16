# mongodb的基本操作

通过mongo命令即可以进入和mongodb的shell交互环境

下面是一些mongo的常用命令:

- 查看所有的数据库:
    ```sql
    show dbs;
    ```
- 显示当前使用的数据库:
    ```sql
    db;
    ```
- 查看当前数据库状态:
    ```sql
    db.stats();
    ```
- 查看数据库中所有的集合:
    ```sql
    show collections;
    ```
- 切换数据库:
    ```sql
    use [database]; # 如果数据库是没有的, 则会自动帮你创建
    ```
- 向集合中添加文档:
    ```sql
    # 类似于mysql向表里面加记录
    db.collection.insertOne(文档内容); 
    db.collection.insertMany([多个文档]);
    # 新的记录如果没有指定字段_id, 则会自动添加一个字段_id作为主键, 这个id是根据时间戳+机器码+进程ID+自增量生成的一个十六进制的唯一字符串
    ```
- 查询文档:
    ```sql
    db.collection.find(文档对象);
    ```
- 修改文档:
    ```sql
    db.collection.updateOne(<filter>, <update>);
    db.collection.updateMany(<filter>, <update>);
    db.collection.replaceOne(<filter>, <update>);
    ```
- 删除文档:
    ```sql
    db.collection.deleteMany(查询对象);
    db.collection.deleteOne(查询对象);
    ```