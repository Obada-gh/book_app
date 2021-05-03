'use strict';
require('dotenv').config;
const express = require('express');
const superagent = require('superagent');

const server = express();
const PORT = process.env.PORT || 8000;
server.use(express.static('./public'));
server.set('view engine','ejs');
server.use(express.urlencoded({extended:true})); // take the form data and add it into the req.body

server.get('/hello',(req,res)=>{
  res.render('pages/index');
});

server.get('/searches/new',(req,res)=>{
  res.render('pages/searches/new');
});

server.get('/',(req,res)=>{
  res.render('pages/index');
});

server.get('/show',(req,res)=>{
  res.render('pages/searches/show');
});

server.get('/searches',searchHandler);
server.get('*',errorHandler);


function searchHandler(req,res){
  let search =req.body.search;
  let type = req.body.type;
 
  let booksUrl = `https://www.googleapis.com/books/v1/volumes?q=${type}:${search}`;
  superagent.get(booksUrl)
    .then(info => {
      let booksInfo = info.body.items;

      let booksMap = booksInfo.map((element)=>{
        return new BooksCons(element);
      });
      console.log(booksMap);
      res.render('pages/searches/show',{booksArr:booksMap});
    }).catch(error =>{
      console.log(error);
      res.render('pages/error');
    });
}

function BooksCons(bookAdd){
  this.title=bookAdd. volumeInfo.title;
  this.authors=bookAdd.volumeInfo.authors;
  this.description=bookAdd.volumeInfo.description || 'not found';
  this.language=bookAdd.volumeInfo.language;
}


function errorHandler(req,res) {
  return res.render('pages/error');
}

server.listen(PORT,()=>{
  console.log(`i am on port ${PORT}`);
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



