import { sql } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, jsonb, integer, boolean, foreignKey } from "drizzle-orm/pg-core";
import { prices, subscriptionStatus } from "../migrations/schema";
// import { prices, subscriptionStatus, users } from "../migrations/schema";

export const folders = pgTable('folders', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),
    startTime: timestamp('start_time', { withTimezone: true, mode: 'string' }),
    endTime: timestamp('end_time', { withTimezone: true, mode: 'string' }),
});

export const files = pgTable('files', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),
    folderId: uuid('folder_id').references(() => folders.id, { onDelete: 'cascade' }),
    isShared: boolean('is_shared').default(false),
    likes: integer('likes').default(0),
});

export const comments = pgTable('comments', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
    data: text('data'),
    inTrash: text('in_trash'),
    fileId: uuid('file_id').references(() => files.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').references(() => users.id),
});

export const users = pgTable("users", {
    id: uuid("id").primaryKey().notNull(),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url"),
    billingAddress: jsonb("billing_address"),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
    paymentMethod: jsonb("payment_method"),
    email: text("email"),
    isAdministrator: boolean("is_administrator").default(false),
    password: text("password"),
},
    (table) => {
        return {
            usersIdFkey: foreignKey({
                columns: [table.id],
                foreignColumns: [table.id],
                name: "users_id_fkey"
            }),
        }
});

export const subscriptions = pgTable("subscriptions", {
	id: text("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => users.id),
	status: subscriptionStatus("status"),
	metadata: jsonb("metadata"),
	priceId: text("price_id").references(() => prices.id),
	quantity: integer("quantity"),
	cancelAtPeriodEnd: boolean("cancel_at_period_end"),
	created: timestamp("created", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
	currentPeriodStart: timestamp("current_period_start", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
	currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
	endedAt: timestamp("ended_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	cancelAt: timestamp("cancel_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	canceledAt: timestamp("canceled_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	trialStart: timestamp("trial_start", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	trialEnd: timestamp("trial_end", { withTimezone: true, mode: 'string' }).default(sql`now()`),
});