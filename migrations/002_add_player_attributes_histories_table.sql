ALTER TABLE PlayerAttributesHistories ADD isMember INT(1) NOT NULL DEFAULT 0;
ALTER TABLE PlayerAttributesHistories ADD isPlanToRelease INT(1) NOT NULL DEFAULT 0;
ALTER TABLE PlayerAttributesHistories ADD memo TEXT NOT NULL DEFAULT '';
