const { Client } = require('pg');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'DATABASE_URL missing in environment variables' })
    };
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        address TEXT NOT NULL,
        cart JSONB NOT NULL,
        total_price NUMERIC NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body || '{}');
      const res = await client.query(
        `INSERT INTO orders (customer_name, phone, address, cart, total_price)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [data.customer_name || 'بدون اسم', data.phone || '', data.address || '', JSON.stringify(data.cart || []), data.total_price || 0]
      );
      await client.end();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, order: res.rows[0] })
      };
    }

    if (event.httpMethod === 'GET') {
      const res = await client.query('SELECT * FROM orders ORDER BY created_at DESC');
      await client.end();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(res.rows)
      };
    }

    await client.end();
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  } catch (err) {
    if (client) await client.end().catch(() => {});
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
