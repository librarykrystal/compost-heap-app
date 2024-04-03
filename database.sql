-- Remember USER is a reserved keyword with Postgres—
-- always put "user" in double-quotes in queries!


--- [ CREATE TABLES ] ---
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "tag_text" BOOLEAN default TRUE,
    "dark_mode" BOOLEAN default FALSE
);

--- (Now spin up the app and register as a new user before creating the rest of the tables) ---

CREATE TABLE "tag" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "label" VARCHAR (100) NOT NULL,
    "hex" VARCHAR (10)
);

CREATE TABLE "project" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "title" VARCHAR (100) NOT NULL,
    "type" VARCHAR (100),
    "genre" VARCHAR (100),
    "notes" VARCHAR (1000)
);

CREATE TABLE "idea" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "headline" VARCHAR (100) NOT NULL,
    "notes" VARCHAR (1000),
    "tag_id" INT REFERENCES "tag",
    "project_id" INT REFERENCES "project",
    "star" BOOLEAN default false
);


--- [ INSERT STARTER TAGS ] ---
-- For TEMP DEV USE with pre-registered accounts.
-- New accounts will eventually auto-POST this set of starter tags upon account creation.
INSERT INTO "tag" ("label", "user_id", "hex")
VALUES
('None', 1, '#FFFFFF'), -- 1
('Setting', 1, '#FB8A4E'),  -- 2
('Physical Trait', 1, '#61AE51'),  -- 3
('Personality Trait', 1, '#D44A96'),  -- 4
('Internal Conflict', 1, '#8F4ED9'),  -- 5
('External Conflict', 1, '#FFD05E'),  -- 6
('Dialogue', 1, '#2274E0'),  -- 7
('Event', 1, '#FF5C63'),  -- 8
('Martian Pets', 1, '#00BAA8');  -- 9

--- [ OPTIONAL STARTER PROJECTS for testing ] --- insert after registering an account with ID of 1
INSERT INTO "project" ("user_id", "title", "type", "genre", "notes")
VALUES
(1, 'The Castle of Dr. Dali', 'Short Story', 'Horror', 'Dr. Dali makes dolls come to life and sends them out for groceries.'),
(1, 'Heart-Crossed Lovers', 'Novel', 'Romance', 'Lovers meet in fencing class and cross their hearts to be true.'),
(1, 'Martian Animal Rescue, Inc.', 'Novella', 'Science Fiction', 'An animal rescue on Mars finds homes for unusual pets.'),
(1, 'Doppelframer', 'Graphic Novel', 'Thriller', 'A theif travels the world finding personal doppelgangers and framing them for his crimes.');

--- [ OPTIONAL STARTER IDEAS for testing] --- insert after registering an account with ID of 1
INSERT INTO "idea" ("user_id", "headline", "notes", "tag_id", "project_id", "star")
VALUES
(1, 'Pretzel octopus sculpture', 'suction cups are big pieces of salt', 2, null, true),
(1, 'Silver nail polish', 'homage to The Big Sleep', 3, 4, false),
(1, 'Useful clumsiness', 'character has accidents that are helpful or used for comedic effect', 4, 1, false),
(1, 'Real self or invented persona?', 'character feels themselves disappearing into their contrived public persona, finds it distressing', 5, null, false),
(1, 'Unwanted nomination', 'character B nominates character A for position that would expose crimes of char A', 6, 4, false),
(1, 'He looks at me as though I look like him', 'said by someone in love', 7, 2, true),
(1, 'Reveal character is a ghost', 'maybe they walk through a wall to prove it', 8, null, false),
(1, 'Martian cats have two noses', 'boop is done with peace sign hand', 9, 3, true),
(1, 'Martian dogs have two tails', 'if feeling meh, only one wags', 9, 3, false);
