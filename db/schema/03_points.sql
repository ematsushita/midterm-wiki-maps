DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  img_url VARCHAR(255),
  latitude REAL,
  longitude REAL
);
