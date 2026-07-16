const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.get("/battery", (req, res) => {
  res.json({
    battery: 33,
    range: 130
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
