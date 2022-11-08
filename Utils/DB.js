// const Pool = require("pg").Pool;
const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "",
  port: 5432,
  database: "todoapp"
});


module.exports =  pool ;
