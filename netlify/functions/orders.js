const { Client } = require('pg');

exports.handler = async (event) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    // إنشاء جدول الطلبات تلقائياً في قاعدة البيانات إذا لم يكن موجوداً
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

    // إرسال طلب جديد من المتجر (POST)
    if (event.httpMethod === 'POST') {
      const { customer_name, phone, address, cart, total_price } = JSON.parse(event.body);
      const res = await client.query(
        `INSERT INTO orders (customer_name, phone, address, cart, total_price) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [customer_name, phone, address, JSON.stringify(cart), total_price]
      );
      await client.end();
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true, order: res.rows[0] }),
      };
    }

    // جلب كافة الطلبات للوحة الأدمن (GET)
    if (event.httpMethod === 'GET') {
      const res = await client.query('SELECT * FROM orders ORDER BY created_at DESC');
      await client.end();
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(res.rows),
      };
    }

    await client.end();
    return { statusCode: 405, body: 'Method Not Allowed' };
  } catch (error) {
    return { 
      statusCode: 500, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message }) 
    };
  }
};
