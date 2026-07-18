const { Pool } = require('pg');

// DATABASE_URL la provee Railway (o un .env local)
// Formato: postgresql://usuario:password@host:puerto/basedatos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false }
});

async function connectDB() {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    console.log('✅ Conectado a PostgreSQL');
    return pool;
  } catch (error) {
    console.error('❌ Error al conectar a PostgreSQL:', error.message);
    throw error;
  }
}

module.exports = {
  connectDB,
  pool
};
