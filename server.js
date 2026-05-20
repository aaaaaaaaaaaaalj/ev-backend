const express = require("express");
const app = express();

app.get("/login", (req, res) => {
  const url = `https://api.enode.io/oauth/authorize?client_id=TON_CLIENT_ID&response_type=code&redirect_uri=https://ev-backend-259f.onrender.com/callback`;

  res.redirect(url);
});


// 🔥 IMPORTANT RENDER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
