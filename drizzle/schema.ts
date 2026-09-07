import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  customerName: varchar("customerName", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  service: varchar("service", { length: 180 }).notNull(),
  bookingDate: varchar("bookingDate", { length: 10 }).notNull(),
  bookingTime: varchar("bookingTime", { length: 5 }).notNull(),
  notes: text("notes"),
  status: mysqlEnum("status", ["new", "confirmed", "cancelled"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;
