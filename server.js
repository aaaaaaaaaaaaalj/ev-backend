const express = require("express");
const app = express();

app.get("/login", (req, res) => {
  const url = `https://oauth.sandbox.enode.io/oauth2/token`;

  res.redirect(url);
});


// 🔥 IMPORTANT RENDER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
