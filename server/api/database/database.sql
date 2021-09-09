CREATE TABLE users(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR (50) NOT NULL,
	mail VARCHAR (255) NOT NULL,
	birth_date DATE NOT NULL,
	country VARCHAR (30),
	password VARCHAR (255) NOT NULL,
);

CREATE TABLE posts(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	category VARCHAR (20) NOT NULL,
	link VARCHAR (20) NOT NULL,
	album VARCHAR (20) NOT NULL,
	band VARCHAR (20) NOT NULL,
	description VARCHAR (20) NOT NULL, 
	firm VARCHAR (50) NOT NULL,
	hour INT NOT NULL,
	date DATE NOT NULL,
	user_id BIGINT NOT NULL REFERENCES users(id)
);									

CREATE TABLE comments(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	comment VARCHAR (255) NOT NULL,
	date DATE NOT NULL,
	user_id BIGINT NOT NULL REFERENCES users(id),
	post_id BIGINT NOT NULL REFERENCES posts (id),
);