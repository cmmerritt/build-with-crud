import { Router } from 'express';
import Quote from '../models/Quote.js';
import QuoteService from '../services/QuoteService.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const quote = await QuoteService.create(req.body);
      res.send(quote);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const quotes = await Quote.findAll();
      res.send(quotes);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const quote = await Quote.findById(req.params.id);
      res.send(quote);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const quote = await Quote.update(req.body, req.params.id);
      res.send(quote);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const quote = await Quote.delete(req.params.id);
      res.send(quote);
    } catch (err) {
      next(err);
    }
  });
