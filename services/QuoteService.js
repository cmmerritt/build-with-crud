import { sendSms } from '../lib/utils/twilio.js';
import Quote from '../models/Quote.js';

export default class QuoteService {
  static async create({ quote }) {
    const message = await Quote.insert({ quote });
    await sendSms(
      process.env.RECIPIENT_NUMBER, `Your quote is: ${quote}`
    );
    return message;
  }
}
