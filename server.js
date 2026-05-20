const express = require("express");
const app = express();

app.get("/login", (req, res) => {
  const url = "https://api.enode.io/oauth/authorize" +
    "?client_id=a7be4e42-9e37-47c0-a935-66124b47ace6" +
    "&response_type=code" +
    "&redirect_uri=https://ev-backend-259f.onrender.com/callback";

  res.redirect(url);
});

// 🔥 IMPORTANT RENDER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
