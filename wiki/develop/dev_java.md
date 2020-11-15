---
layout: default
parent: Apps
nav_order: 1
title: Java Snippets
author: Yue Wu <me@blaulan.com>
created:  2016-01-09 00:00:00
modified: 2020-08-27 20:25:05
tags: [dev, work]
---

- convert array to list
```java
Arrays.asList(Integer[]);
Arrays.asList("A", "B", "D");
```

- generate a List of integers ranaging from `0` to `size-1`
```java
IntStream.range(0, size).boxed().collect(Collectors.toList());
```

- stream reduce sum
```java
list.stream().reduce(0d, (a, b) -> a+b);
list.stream().reduce(Integer::sum);
```

- convert list to `Map<Key, Item>`
```java
list.stream().collect(
    Collectors.toMap(Item::getKey, item -> item));
```

- group list by multiple keys
```java
import org.apache.commons.lang3.tuple.Pair;
list.stream().collect(
    Collectors.groupingBy(p -> Pair.of(p.key1(), p.key2())))
```

- custom comparator
```java
Comparator<SOME_CLASS> base = Comparator
    // revese sort based on value
    .comparing(SORTING_FIELD_OR_FUNCTION, Comparator.reverseOrder())
    // second level sorting criteria
    .thenComparing(SORTING_FIELD_OR_FUNCTION)
    // sort ascending or descending based on value
    .thenComparing((SOME_CLASS a, SOME_CLASS b) -> {
        SORTING_LOGIC_IMPLANTATION;
    });
list.stream().sorted(base).forEach(a -> SOME_FUNCTION(a));
```

## Language Specific "Features"

- `==` compares reference value, and [smaller long values are cached](https://stackoverflow.com/q/19485818):
```java
public static Long valueOf(long l) {
    final int offset = 128;
    if (l >= -128 && l <= 127) { // will cache
        return LongCache.cache[(int)l + offset];
    }
    return new Long(l);
}
```
When comparing `Long` type variables, always use `a.equals(b)` instead of `a==b`. The same logic also applies to `Integer` and `Double`.

## Write Object as JSON File

```java
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONWriter;
import com.alibaba.fastjson.serializer.SerializerFeature;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public void save(String path, Object obj) {
    try {
        File outputFile = new File(path);
        if(!outputFile.exists()){
            outputFile.getParentFile().mkdirs();
        }
        
        // JSONWriter writer = new JSONWriter(new FileWriter(outputFile));
        // writer.config(SerializerFeature.DisableCircularReferenceDetect, true);
        // writer.writeObject(obj);
        // writer.close();
        
        FileWriter writer = new FileWriter(outputFile, true);
        String jsonString = JSON.toJSONString(
            obj, SerializerFeature.DisableCircularReferenceDetect);
        writer.write(jsonString+"\n");
        writer.close();
    }
    catch (IOException e) {
        e.printStackTrace();
    }
}
```
