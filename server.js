const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.NODE_ENV_POSTSQL_USERNAME,
  password: process.env.NODE_ENV_POSTSQL_PASSWORD,
  database: process.env.NODE_ENV_POSTSQL_DBNAME,
  port: process.env.NODE_ENV_POSTSQL_PORT,
  host: process.env.NODE_ENV_POSTSQL_HOSTNAME,
});

// crud operation
const getData = (req, res) => {
  pool.query("SELECT * FROM test_table1 ORDER BY id ASC", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(result.rows);
  });
};

const addData = (req, res) => {
  const { entryno, name, email, country } = req.body;

  pool.query(
    "INSERT INTO test_table1 (field_1,field_2,field_3,field_4) VALUES($1,$2,$3,$4) RETURNING *",
    [entryno, name, email, country],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(201).send(`Data created with ID: ${result.rows[0].id}`);
    }
  );
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  pool.query(`DELETE FROM test_table1 WHERE id = $1`, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Data deleted with ID : ${id}`);
  });
};

const updateData = (req, res) => {
  const { id } = req.params;
  const { entryno, name, email, country } = req.body;
  pool.query(
    "UPDATE test_table1 SET field_1 = $1, field_2 = $2, field_3 = $3, field_4 = $4 WHERE id = $5",
    [entryno, name, email, country, id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send(`Data modified with ID: ${id}`);
    }
  );
};

module.exports = { getData, addData, deleteUser, updateData };
