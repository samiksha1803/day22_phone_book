const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let contacts = [];

app.get("/contacts", (req, res) => {
  res.json(contacts);
});

app.post("/contacts", (req, res) => {
  contacts.push(req.body);
  res.json({ message: "Added" });
});

app.delete("/contacts/:name", (req, res) => {
  contacts = contacts.filter(c => c.name.toLowerCase() !== req.params.name.toLowerCase());
  res.json({ message: "Deleted" });
});

#app.listen(5000, () => console.log("Server running on http://localhost:5000"));
