---
layout: default
parent: Apps
nav_order: 1
title: DB Snippets
author: Yue Wu <me@blaulan.com>
created:  2015-12-17 00:00:00
modified: 2020-08-27 20:25:05
tags: [dev, work]
---

## SQL Server

- Find all duplicated records in table `ids`:
```sql
SELECT DISTINCT p.*
FROM ids p
JOIN ids q
    ON p.VALUE = q.VALUE
        AND p.KEY <> q.KEY
```

- Select top 10 records of each group: 
```sql
SELECT rs.Field1,rs.Field2 
FROM (
    SELECT *, ROW_NUMBER() OVER (
        PARTITION BY Section
        ORDER BY RankCriteria DESC
    ) AS RowNo
    FROM table
) rs WHERE RowNo <= 10
```

- Find tables with column that contains certain text:
```sql
SELECT c.name AS ColumnName, t.name AS TableName
FROM sys.columns AS c
JOIN sys.tables AS t
    ON c.object_id = t.object_id
WHERE c.name LIKE '%YOUR COLUMN NAME%'
ORDER BY ColumnName
```

- database summary from `sys.tables`:
```sql
SELECT 
    t.NAME AS TableName,
    s.Name AS SchemaName,
    p.rows AS RowCounts,
    SUM(a.total_pages) * 8 AS TotalSpaceKB, 
    CAST(ROUND(((SUM(a.total_pages) * 8) / 1024.00), 2) AS NUMERIC(36, 2)) AS TotalSpaceMB,
    SUM(a.used_pages) * 8 AS UsedSpaceKB, 
    CAST(ROUND(((SUM(a.used_pages) * 8) / 1024.00), 2) AS NUMERIC(36, 2)) AS UsedSpaceMB, 
    (SUM(a.total_pages) - SUM(a.used_pages)) * 8 AS UnusedSpaceKB,
    CAST(ROUND(((SUM(a.total_pages) - SUM(a.used_pages)) * 8) / 1024.00, 2) AS NUMERIC(36, 2)) AS UnusedSpaceMB
FROM sys.tables t
INNER JOIN sys.indexes i ON t.OBJECT_ID = i.object_id
INNER JOIN sys.partitions p ON i.object_id = p.OBJECT_ID AND i.index_id = p.index_id
INNER JOIN sys.allocation_units a ON p.partition_id = a.container_id
LEFT OUTER JOIN sys.schemas s ON t.schema_id = s.schema_id
WHERE t.is_ms_shipped = 0
    AND i.OBJECT_ID > 255
GROUP BY t.Name, s.Name, p.Rows
ORDER BY t.NAME
```

## SQL Server Analysis Services

[Checklist for Memory Optimizations in PowerPivot and Tabular Models][1]:

+ Import only useful columns;
+ Identify critical columns;
+ Normalize columns lowering count of distinct values;
+ Split high cardinality columns;
+ Reduce precision of columns when possible.

[1]: http://www.sqlbi.com/articles/checklist-for-memory-optimizations-in-powerpivot-and-tabular-models
