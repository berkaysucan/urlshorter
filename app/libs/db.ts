import { Pool } from "pg";

import { UrlType } from "../type/type";
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, // Veritabanı kullanıcısının şifresi
  port: 5432, // Varsayılan PostgreSQL portu
});

export async function InsertNewUrl(props:UrlType) {
  const result = await pool.query('INSERT INTO urls (route, link,view,email) VALUES ($1, $2, $3, $4)', [props.route, props.link,props.view,props.email] );
  return result;
}
export async function InsertNewUser(email:string,password:string) {
  const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password] );
  return result;
}
export async function DeleteNewUrl(id:number) {
  const result = await pool.query('DELETE FROM urls WHERE id = $1 ', [id] );
  return result;
}
export async function SearchEmail(email:string) {
  const result = await pool.query('SELECT * FROM urls WHERE email = $1',[email] );  

  if(result.rows.length < 0)
  {
        return null;
  }

  return result.rows;
}


export async function SearchRoute(route:string) {
  const result = await pool.query('SELECT * FROM urls WHERE route = $1',[route] );

  return result;
}

export async function IncreaseView(route:string) {
  const result = await pool.query('UPDATE urls SET view = view + 1 WHERE route = $1', [route])
  return result;
}

// USERS TABLE

export async function SearchEmailFromUser(email:string) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1',[email] );  

  if(result.rows.length < 0)
  {
        return null;
  }

  return result.rows[0];
}



export default pool;