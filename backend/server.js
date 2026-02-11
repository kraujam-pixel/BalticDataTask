// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { Pool } = require("pg");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// app.get("/cities", async (req, res) => {
//   const result = await pool.query("SELECT * FROM cities ORDER BY id");
//   res.json(result.rows);
// });

// app.post("/cities", async (req, res) => {
//   const { name } = req.body;
//   const result = await pool.query(
//     "INSERT INTO cities(name) VALUES($1) RETURNING *",
//     [name]
//   );
//   res.json(result.rows[0]);
// });

// app.delete("/cities/:id", async (req, res) => {
//   await pool.query("DELETE FROM cities WHERE id=$1", [req.params.id]);
//   res.json({ success: true });
// });

// app.listen(5000, () => console.log("Backend running on 5000"));
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/cities", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cities ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/cities", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      "INSERT INTO cities(name) VALUES($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Insert error" });
  }
});

app.delete("/cities/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM cities WHERE id=$1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
