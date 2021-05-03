'use strict';
require('dotenv').config;
const express = require('express');
const superagent = require('superagent');

const server = express();
const PORT = process.env.PORT || 8000;
server.use(express.static('./public'));
server.set('view engine','ejs');

server.get('/hello',(req,res)=>{
  res.render('pages/index');
});

server.get('/show',(req,res)=>{
  res.render('pages/searches/show');
});




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



server.listen(PORT,()=>{
  console.log(`i am on port ${PORT}`);
});
