import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  displayName: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: varchar("password", { length: 60 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  role: text("role", {
    enum: ["unreviewed", "commenter", "editor", "collector"],
  })
    .default("unreviewed")
    .notNull(),
});
// export const usersRelations = relations(users, ({ one, many }) => ({
//   collection: one(collections),
//   // comments: many(comments),
// }));

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  user: integer("user").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  description: text("description"),
});
export const collectionsRelations = relations(collections, ({ many }) => ({
  recordings: many(recordings),
}));

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});
export const servicesRelations = relations(services, ({ many }) => ({
  recordings: many(recordings),
}));

export const places = pgTable("places", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
}); // TODO index on name
export const placesRelations = relations(places, ({ many }) => ({
  recordings: many(recordings),
  cantorsToPlaces: many(cantorsToPlaces),
}));

export const cantors = pgTable(
  "cantors",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
  },
  (table) => ({ nameIdx: index("name_idx").on(table.name) }),
);
export const cantorsRelations = relations(cantors, ({ many }) => ({
  recordings: many(recordings),
  cantorsToPlaces: many(cantorsToPlaces),
}));

export const cantorsToPlaces = pgTable(
  "cantors_to_places",
  {
    cantor: integer("cantor")
      .notNull()
      .references(() => cantors.id),
    place: integer("place")
      .notNull()
      .references(() => places.id),
    yearsActive: smallint("years_active").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.cantor, t.place] }) }),
);
export const cantorsToPlacesRelations = relations(
  cantorsToPlaces,
  ({ one }) => ({
    cantor: one(cantors, {
      fields: [cantorsToPlaces.cantor],
      references: [cantors.id],
    }),
    place: one(places, {
      fields: [cantorsToPlaces.place],
      references: [places.id],
    }),
  }),
);

export const recordings = pgTable("recordings", {
  id: serial("id").primaryKey(),
  collection: integer("collection").notNull(),
  service: integer("service").notNull(),
  place: integer("place").notNull(),
  cantor: integer("cantor").notNull(),
  description: text("description"),
  approxStart: smallint("approx_start"),
  approxEnd: smallint("approx_end"),
});
//
export const recordingsRelations = relations(recordings, ({ one, many }) => ({
  collection: one(collections, {
    fields: [recordings.collection],
    references: [collections.id],
  }),
  place: one(places, { fields: [recordings.place], references: [places.id] }),
  cantor: one(cantors, {
    fields: [recordings.cantor],
    references: [cantors.id],
  }),
  service: one(services, {
    fields: [recordings.service],
    references: [services.id],
  }),
  tracks: many(tracks),
}));

export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  recording: integer("recording")
    .notNull()
    .references(() => recordings.id),
  audio: text("audio").notNull(),
  song: text("song"), // TODO? songs table
});
export const tracksRelations = relations(tracks, ({ one }) => ({
  recording: one(recordings, {
    fields: [tracks.recording],
    references: [recordings.id],
  }),
}));

// TODO comments
// TODO images
// TODO metadata suggestions
