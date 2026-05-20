const express = require("express");
const app = express();

app.get("/vehicle", (req, res) => {
  res.json({
    battery: 75,
    range: 320,
    charging: false
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);