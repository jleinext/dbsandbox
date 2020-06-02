# Migration `20200602145029-init`

This migration has been generated at 6/2/2020, 2:50:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Author" (
"firstName" TEXT NOT NULL  ,"id" TEXT NOT NULL  ,"lastName" TEXT NOT NULL  ,
    PRIMARY KEY ("id"))

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200602145029-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,14 @@
+datasource sqlite {
+  url      = "file:../../prisma.db"
+  provider = "sqlite"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Author {
+  id        String @id
+  firstName String
+  lastName  String
+}
```


