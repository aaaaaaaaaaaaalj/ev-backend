const express = require("express");
const app = express();

// ✅ Route LOGIN
app.get("/login", (req, res) => {
  const url = "https://api.enode.io/oauth/authorize" +
    "?client_id=a7be4e42-9e37-47c0-a935-66124b47ace6" +
    "&response_type=code" +
    "&redirect_uri=https://ev-backend-259f.onrender.com/callback";

  res.redirect(url);
});

// ✅ Route CALLBACK (TRÈS IMPORTANT)
app.get("/callback", (req, res) => {
  const code = req.query.code;

  console.log("Code reçu :", code);

  res.send("Code reçu : " + code);
});

// 🔥 IMPORTANT RENDER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
