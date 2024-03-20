-- Remember USER is a reserved keyword with Postgres—
-- always put "user" in double-quotes in queries!


--- [ CREATE TABLES ] ---

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "tag" (
    "id" SERIAL PRIMARY KEY,
    "label" VARCHAR (100) NOT NULL,
    "hex" VARCHAR (10),   -- for color-coding of tags (user chooses color of added tags)
);

CREATE TABLE "idea" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "headline" VARCHAR (100) NOT NULL,
    "notes" VARCHAR (1000),
    "tag_id" INT REFERENCES "tag",
    "star" BOOLEAN
);


--- [ INSERT STARTER TAGS ] ---

INSERT INTO "tag" ("label", "hex")
VALUES
('Setting', '#FB8A4E'),  -- 1
('Physical Trait', '#61AE51'),  -- 2
('Personality Trait', '#D44A96'),  -- 3
('Internal Conflict', '#8F4ED9'),  -- 4
('External Conflict', '#FFD05E'),  -- 5
('Dialogue', '#2274E0'),  -- 6
('Event', '#FF5C63'),  -- 7
('Martian Pets', '#00BAA8');  -- 8


--- [ OPTIONAL STARTER IDEAS ] --- insert after registering an account with ID of 1

INSERT INTO "idea" ("user_id", "headline", "notes", "tag_id", "star")
VALUES
(1, 'Pretzel octopus sculpture', 'suction cups are big pieces of salt', 1, true),
(1, 'Silver nail polish', 'homage to The Big Sleep', 2, false),
(1, 'Always unintentionaly hiding', 'shy character does not realize they tend to stand behind things, use for comedic effect', 3, false),
(1, 'Self or invented persona?', 'character feels themselves disappearing into their public persona, is distressing', 4, false),
(1, 'Framed by doppelganger', 'killer frames their doppelganger then goes in search of another one for next time', 5, false),
(1, 'He looks at me as though I look like him', 'said by someone in love', 6, true),
(1, 'Reveal character is a ghost', 'maybe they walk through a wall to prove it', 7, false),
(1, 'Martian cats have two noses', 'boop is done with peace sign hand', 8, true),
(1, 'Sidewalk pareidolia', 'Funny face in pavement in front of craft store on Euclid Ave', null, false);