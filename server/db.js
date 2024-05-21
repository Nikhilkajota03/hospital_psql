// db.js (Assuming pool is exported among other things)
import pg from 'pg';



const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "students",
  password: "12345",
  port: 5432,
});

export default pool

