const express = require("express");
const bodyParser = require("body-parser");
const db = require("./server");

const app = express();

app.use(express.json());
const PORT = 4000;

app.get("/", (req, res) => {
  res.json({
    info: "Node.js Express & Postgress Crud Development Testing",
  });
});

app.get("/data", db.getData);
app.post("/data", db.addData);
app.delete("/data/:id", db.deleteUser);
app.put("/data/:id", db.updateData);

app.listen(PORT, () => console.log("app is listening on port 4000"));
