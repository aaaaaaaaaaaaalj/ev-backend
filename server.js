const express = require("express");
const app = express();

app.get("/vehicle", (req, res) => {
  res.json({
    battery: 75,
    range: 320,
    charging: false
  });
});

// 🔥 IMPORTANT RENDER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
