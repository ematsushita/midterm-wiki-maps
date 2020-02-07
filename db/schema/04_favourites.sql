DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  list_id INTEGER REFERENCES lists(id)
);
