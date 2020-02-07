DROP TABLE IF EXISTS contributers CASCADE;

CREATE TABLE contributors (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  list_id INTEGER REFERENCES lists(id)
)
