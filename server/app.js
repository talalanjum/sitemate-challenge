import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

const httpPort = 8080;

app.get("/", async (req, res) => {
  const query = "SELECT * FROM issues";

  db.query(query, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
});

app.get("/:id", async (req, res) => {
  const query = "SELECT * FROM issues WHERE `id` = ?";

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
});

app.post("/", async (req, res) => {
  const query = "INSERT INTO issues(`title`, `description`) VALUES(?)";

  const { title, description } = req.body;

  const values = [req.body.title, req.body.description];

  db.query(query, [values], (err) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    return res.status(200).json("Creation Successful!");
  });
});

app.put("/:id", async (req, res) => {
  const query =
    "UPDATE issues SET `title` = ?, `description` = ? WHERE `id` = ?";

  const { title, description } = req.body;

  const values = [title, description];

  db.query(query, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Update Successful!");
  });
});

app.delete("/:id", async (req, res) => {
  const query = "DELETE FROM issues WHERE `id` = ?";

  db.query(query, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Deletion Successful!");
  });
});

app.listen(httpPort, console.log(`App listening on port ${httpPort}`));
