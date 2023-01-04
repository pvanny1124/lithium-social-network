CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name varchar(50),
  last_name varchar(50),
  username varchar (50) UNIQUE,
  email varchar(50) UNIQUE,
  password varchar(50)
);

CREATE TABLE IF NOT EXISTS posts (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  user_id int REFERENCES users(id) NOT NULL,
  title varchar(50),
  tag varchar(50),
  created_at timestamp default current_timestamp,
  text TEXT,
  upvotes int default 0,
  downvotes int default 0
);

CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  user_id int REFERENCES users(id) NOT NULL,
  post_id int REFERENCES posts(id) NOT NULL,
  comment_id int,
  text TEXT,
  upvotes int default 0,
  downvotes int default 0,
  created_at timestamp default current_timestamp
);
