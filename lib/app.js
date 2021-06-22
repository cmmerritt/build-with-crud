import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import request from 'superagent'; 

import quoteController from '../controllers/quotes.js';

const app = express();

const apiKey = process.env.QUOTE_API_KEY;
const apiHost = process.env.QUOTE_API_HOST;

app.use(express.json());

app.use('/api/v1/quotes', quoteController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.get('/:id', async (req, res) => {
  // use SQL query to get data...
  try {
    const response = await request.get(`https://quotes15.p.rapidapi.com/quotes/random?x-rapidapi-key=${apiKey}&x-rapidapi-host=${apiHost}
    `);
    console.log(response.body);
    // send back the data
    res.json(response.body || null); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

export default app;
