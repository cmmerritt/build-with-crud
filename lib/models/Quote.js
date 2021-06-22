import pool from '../utils/pool.js';

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

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM quotes WHERE id=$1', [id]);

    return new Quote(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM quotes');

    return rows.map(row => new Quote(row));
  }

  static async update(quote, id) {
    const { rows } = await pool.query('UPDATE quotes SET quote = $1 WHERE id = $2 RETURNING *', [quote.quote, id]);

    return new Quote(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM quotes WHERE id = $1 RETURNING *', [id]);

    return new Quote(rows[0]);
  }
}
