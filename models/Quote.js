import pool from '../lib/utils/pool.js';

export default class Quote {
  id;
  quote;

  constructor(row) {
    this.id = row.id;
    this.quote = row.quote;
  }

  static async insert ({ quote }) {
    const { rows } = await pool.query(
      'INSERT INTO quotes (quote) VALUES ($1) RETURNING *', [quote]
    );

    return new Quote(rows[0]);
  }
}
