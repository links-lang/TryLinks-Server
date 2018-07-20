DROP TABLE IF EXISTS "LinksUser"        CASCADE;
DROP TABLE IF EXISTS "LinksTutorial"    CASCADE;
DROP TABLE IF EXISTS "LinksFile"        CASCADE;

CREATE TABLE "LinksUser" (
    username        VARCHAR(30)     PRIMARY KEY,
    email           VARCHAR(40),
    password        VARCHAR(60),
    last_tutorial   INTEGER
);

CREATE TABLE "LinksTutorial" (
    tutorial_id     SERIAL          PRIMARY KEY,
    title           VARCHAR(50),
    description     VARCHAR(10000),
    source          VARCHAR(10000)
);

CREATE TABLE "LinksFile" (
    data            VARCHAR(10000),
    tutorial_id     INTEGER         REFERENCES "LinksTutorial" (tutorial_id)    ON DELETE CASCADE,
    username        VARCHAR(30)     REFERENCES "LinksUser" (username)           ON DELETE CASCADE,
    PRIMARY KEY (tutorial_id, username)
);


--CREATE FUNCTION add_files()
--    RETURNS trigger
--    LANGUAGE 'plpgsql'
--    COST 100
--    VOLATILE NOT LEAKPROOF
----    ROWS 0    -- Gives an error: ROWS must be positive - may be dependent on postgresql version
--    AS $BODY$
--    BEGIN
--      INSERT INTO "LinksFile"("username", "data", "tutorial_id")
--        VALUES(new."username", '', 0);
--      INSERT INTO "LinksFile"("username", "data", "tutorial_id")
--        VALUES(new."username", '', 1);
--      INSERT INTO "LinksFile"("username", "data", "tutorial_id")
--        VALUES(new."username", '', 2);
--      INSERT INTO "LinksFile"("username", "data", "tutorial_id")
--        VALUES(new."username", '', 3);
--      INSERT INTO "LinksFile"("username", "data", "tutorial_id")
--        VALUES(new."username", '', 4);
--      INSERT INTO "LinksFile"("username", "data", "tutorial_id")
--        VALUES(new."username", '', 5);
--      RETURN new;
--    END;
--
--$BODY$;
--
--ALTER FUNCTION add_files()
--    OWNER TO postgres;
--
--CREATE TRIGGER init_file_at_signup
--    AFTER INSERT
--    ON "LinksUser"
--    FOR EACH ROW
--    EXECUTE PROCEDURE add_files();
--
--ALTER TABLE "LinksFile"
--    ADD CONSTRAINT username FOREIGN KEY (username)
--    REFERENCES "LinksUser" (username) MATCH SIMPLE
--    ON UPDATE NO ACTION
--    ON DELETE CASCADE;
