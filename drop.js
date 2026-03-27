const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function run() {
  try {
    await sql`DROP TABLE IF EXISTS "watchlist"`;
    console.log("Table dropped");
  } catch (err) {
    console.error(err);
  }
}
run();
