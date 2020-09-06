import 'dotenv/config';
import uuidv4 from 'uuid/v4';
import cors from 'cors';
import express from 'express';
import _ from 'lodash';
import models from './models/mock-model';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});


app.get('/api/books', (req, res) => {
  return res.send(Object.values(req.context.models.books));
});

app.get('/api/books/:bookId', (req, res) => {

    var book = _.find(req.context.models.books, {_id:req.params.bookId});    
    return res.send(book);
});

app.post('/api/books', (req, res) => {
  const id = uuidv4();
  const book = req.body;
  book.registered = new Date();
  book._id = id;

  req.context.models.books.push(book);

  return res.send(book);
});

app.put('/api/books/:bookId', (req, res) => {
  const book = req.body;
  const id = req.params.bookId;
 
  const oldBook = _.find(req.context.models.books, {_id:id});
  Object.assign(oldBook, book );
  
  return res.send(book);
});

app.delete('/api/books/:bookId', (req, res) => {
  let id = req.params.bookId;
  _.remove(req.context.models.books, {_id:id})
  
  return res.send();
});

app.listen(process.env.PORT, () =>
  console.log(`Book list REST API listening on port ${process.env.PORT}!`),
);
