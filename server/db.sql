-- SQL schema for FavLinks table

CREATE TABLE IF NOT EXISTS favlinks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Optional seed data
INSERT INTO favlinks (name, url, description)
VALUES
    ('Google', 'https://www.google.com', 'Search engine'),
    ('YouTube', 'https://www.youtube.com', 'Video platform')
ON CONFLICT DO NOTHING;
