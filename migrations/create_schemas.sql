-- Clubs
CREATE TABLE IF NOT EXISTS Clubs (
    uid INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    trivialName VARCHAR(50) NOT NULL,
    nation VARCHAR(50) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS clubsUidIndex ON Clubs(uid);
CREATE INDEX IF NOT EXISTS clubsNation ON Clubs(nation);

-- Players
CREATE TABLE IF NOT EXISTS Players (
    uid BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    nation VARCHAR(50) NOT NULL,
    birthDate CHARACTER(10) NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS playersUidIndex ON Players(uid);
CREATE INDEX IF NOT EXISTS playersNationIndex ON Players(nation);

-- PlayerAttributesHistories
CREATE TABLE IF NOT EXISTS PlayerAttributesHistories (
    playerId BIGINT NOT NULL,
    clubId INT,
    onLoanFromClubId INT,
    savedAt CHARACTER(10) NOT NULL,

    CONSTRAINT fkPlayerId FOREIGN KEY (playerId) REFERENCES Players(uid),
    CONSTRAINT fkClubId FOREIGN KEY (clubId) REFERENCES Clubs(uid),
    CONSTRAINT fkOnLoanFromClubId FOREIGN KEY (onLoanFromClubId) REFERENCES Clubs(uid)
);
