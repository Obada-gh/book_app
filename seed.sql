DROP TABLE IF EXISTS books;

CREATE TABLE IF NOT EXISTS books (

  id SERIAL PRIMARY KEY,
  url VARCHAR(255),
  title VARCHAR(255),
  author VARCHAR(255),
  description TEXT

);

INSERT INTO books (title, author, url, description) 
VALUES('prepare the lecture','obada','http://books.google.com/books/content?id=-otKEYNwP3oC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','work');