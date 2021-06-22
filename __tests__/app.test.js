import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import { formatQuote } from '../lib/utils/utils.js';
import quoteData from '../data/quoteData.js';
import Quote from '../models/Quote.js';

const testQuoteAndAuthor = 'A theatre is the most important sort of house in the world, because that\'s where people are shown what they could be if they wanted, and what they\'d like to be if they dared to and what they really are - Tove Jansson';

const testShotsQuote = 'You miss 100% of the shots you don\'t take - Wayne Gretzky - Michael Scott';

const notAQuote = 'This is not a quote - Nobody';

describe('quote API munging', () => {
  it('munges quote', async () => {
    const expected = testQuoteAndAuthor;
    const actual = formatQuote(quoteData);
    expect(actual).toEqual(expected);
  });
});

describe('demo routes', () => {
  beforeEach(async () => {
    return setup(pool);
  });

  it('adds a new quote to the database and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/quotes')
      .send({ quote: testQuoteAndAuthor });

    expect(res.body).toEqual({ id: '1', quote: testQuoteAndAuthor });
  });

  it('gets a quote by id via GET', async () => {
    const quote = await Quote.insert({ quote: testShotsQuote });
    return request(app)
      .get(`/api/v1/quotes/${quote.id}`)
      .then((res) => {
        expect(res.body).toEqual(quote);
      });
  });

  it('gets all quotes via GET', async () => {
    const quote1 = await Quote.insert({ quote: testQuoteAndAuthor });
    const quote2 = await Quote.insert({ quote: testShotsQuote });

    const res = await request(app).get('/api/v1/quotes');

    expect(res.body).toEqual([quote1, quote2]);
  });

  it('updates a quote via PUT', async () => {
    const quote1 = await Quote.insert({ quote: testQuoteAndAuthor });
    const updatedQuote = { quote: notAQuote };

    const res = await request(app).put(`/api/v1/quotes/${quote1.id}`).send(updatedQuote);
    expect(res.body).toEqual({ 'id': '1', ...updatedQuote });
  });

  it('deletes quote by id', async () => {
    const quote1 = await Quote.insert({ quote: testShotsQuote });

    const res = await request(app).delete(`/api/v1/quotes/${quote1.id}`);
    expect(res.body).toEqual(quote1);
  });
});

