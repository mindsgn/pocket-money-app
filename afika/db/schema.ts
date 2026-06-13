import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const user = sqliteTable("user", {
  id: text("user").primaryKey(),
});

export type wallet = typeof user.$inferSelect;
