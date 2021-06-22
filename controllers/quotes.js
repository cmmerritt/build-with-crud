import { Router } from 'express';
// import Quote from '../models/Quote.js';
import QuoteService from '../services/QuoteService.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const quote = await QuoteService.create(req.body);
      res.send(quote);
    } catch (err) {
      next(err);
    }
  });
