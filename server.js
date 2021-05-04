'use strict';
require('dotenv').config;
const express = require('express');
// const bodyParser = require('body-parser');
const pg = require('pg');
const superagent = require('superagent');
const server = express();
// const ejs = require('ejs');
// server.use(ejs);
const cors = require('cors');
server.use(cors());
const PORT = process.env.PORT || 8000;
server.use(express.static('./public'));
server.set('view engine','ejs');
server.use(express.urlencoded({extended:true})); // take the form data and add it into the req.body also to use post method
const client = new pg.Client(process.env.DATABASE_URL);
client.connect().then(()=>{

  server.listen(PORT,()=>{
    console.log(`i am on port ${PORT}`);
  });

});


server.get('/',(req,res)=>{
  // let sql = `SELECT * FROM books;`;
  // client.query(sql).then(info =>{
  //   console.log(info.rows);
  let obada = {age:25
  };
  res.render('pages/index',{Data:obada});
});


server.get('/searches/new',(req,res)=>{
  res.render('pages/searches/new');
});

server.post('/searches',(req,res) => {
  let search = req.body.search;
  let type = req.body.type;
  let booksUrl = `https://www.googleapis.com/books/v1/volumes?q=${type}:${search}`;
  superagent.get(booksUrl).then(data =>{
    let bookData = data.body.items;
    let bookMap = bookData.map((item)=>{
      return new BooksCons(item);
    });
    res.render('pages/searches/show',{booksArr: bookMap});
  }).catch(error=>{
    res.render('pages/error',{er:error});

  });
});

server.post('/addbook',(req,res)=>{
  let sql = 'INSERT INTO books (url,title,author,description) VALUES ($1,$2,$3,$4) RETURNING *;';
  let val = [req.body.url,req.body.title,req.body.author,req.body.description];
  client.query(sql,val).then(dbres =>{
    res.redirect(`/books/${dbres.rows[0].id}`);
  }).catch(error=>{
    res.render('pages/error',{err:error});
  });
});

server.get('/books/:id',(req,res)=> {
  let idBook = req.params.id;
  let sql = `SELECT * FROM books WHERE id=$1`;
  let val = [idBook];
  client.query(sql,val).then(data=>{
    res.render('pages/detail',{book: data.rows[0]});
  }).catch(error=>{
    res.render('pages/error',{err:error});
  });
});


server.get('/hello',(req,res)=>{
  res.render('pages/index');
});




server.get('/show',(req,res)=>{
  res.render('pages/searches/show');
});




function BooksCons(bookAdd){
  this.url = bookAdd.volumeInfo.imageLinks;
  if (Object.keys(this.url).length !== 0){
    this.url = this.url.thumbnail;
  }else {
    this.url = 'https://i.imgur.com/J5LVHEL.jpg';
  }
  this.title=bookAdd. volumeInfo.title;
  this.author=bookAdd.volumeInfo.authors;
  this.description=bookAdd.volumeInfo.description || 'not found';
}

server.get('*',errorHandler);
function errorHandler(req,res) {
  return res.render('pages/error');
}











// server.get('/',(req,res)=>{
//   res.send('i am alive');
// });
//express middle ware

// server.use(express.urlencoded({extended:true})); // take the form data and add it into the req.body

// server.get('/',(req,res)=>{
//   console.log(req.body);
//   //   res.send('ok');
//   res.render('index');
// });

// server.get('/listFamily',(req,res)=>{
//   let farr = ['king','prince','joker'];
//   //   res.render('lfm');
//   res.render('lfm',{fdata:farr});
// });

// server.get('/booksList',(req,res)=>{
//   let url = `https://www.googleapis.com/books/v1/volumes?q=cats`;
//   superagent.get(url).then(booksdata=>{
//     // res.send(booksdata.body.items);
//     res.send('bookslist',{booksArr:booksdata.body.items});
//   });


// //   res.render('bookslist',{fdata:farr});
// });



