import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import { formatQuote } from '../lib/utils/utils.js';
import quoteData from '../data/quoteData.js';

const testQuote = 'A theatre is the most important sort of house in the world, because that\'s where people are shown what they could be if they wanted, and what they\'d like to be if they dared to and what they really are';


describe('quote API munging', () => {
  it('munges quote', async () => {
    const expected = testQuote;
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
      .send({ quote: testQuote });

    expect(res.body).toEqual({ id: '1', quote: testQuote });
  });
});

