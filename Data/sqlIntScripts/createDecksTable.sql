-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."decks" (
    "id" int2 NOT NULL,
    "deck" text NOT NULL,
    PRIMARY KEY ("id")
);