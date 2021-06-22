import { sendSms } from '../utils/twilio.js';
import Quote from '../models/Quote.js';
// import request from 'superagent'; 
import fetch from 'node-fetch';
import { formatQuote } from '../utils/utils.js';

const apiKey = process.env.QUOTE_API_KEY;
const apiHost = process.env.QUOTE_API_HOST;

export default class QuoteService {
  static async create({ quote }) {

    const response = await fetch('https://quotes15.p.rapidapi.com/quotes/random/', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost
      }
    })
      .then(response => response.json());

    quote = formatQuote(response);

    const message = await Quote.insert({ quote });

    await sendSms(
      process.env.RECIPIENT_NUMBER, `Your quote is: ${message.quote}`
    );
    return message;
  }
}
