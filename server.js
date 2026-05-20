const express = require("express");
const app = express();

app.get("/connect", async (req, res) => {

  const response = await fetch("https://api.enode.io/users", {
    method: "POST",
    headers: {
      "Authorization": "Bearer TON_ACCESS_TOKEN",
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();

  res.json(data);
});

// 🔥 IMPORTANT RENDER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
