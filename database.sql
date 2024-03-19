-- Remember USER is a reserved keyword with Postgres—
-- always put "user" in double-quotes in queries!


--- [ CREATE TABLES ] ---

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "heap" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "headline" VARCHAR (100) NOT NULL,
    "notes" VARCHAR (1000),
    "tag" VARCHAR (1000) REFERENCES "tag",
    "star" BOOLEAN,
);

CREATE TABLE "tag" (
    "id" SERIAL PRIMARY KEY,
    "label" VARCHAR (100) NOT NULL,
    "hex" VARCHAR (10),   -- for color-coding of tags (user chooses color)
);


--- [ INSERT STARTER DATA ] ---

INSERT INTO "tag" ("label", "hex")
VALUES
('location', '#fb9062'),
('physical trait', '#ce4993')
('personality trait', '#ee5d6c')
('conflict', '#559e83')
('dialogue', '#1b85b8')
('event', '#eeaf61')