const express = require("express");

const app = express();

const CLIENT_ID = "TON_CLIENT_ID";
const CLIENT_SECRET = "TON_CLIENT_SECRET";

app.get("/", (req, res) => {
  res.send("Backend Enode OK");
});

app.get("/token", async (req, res) => {

  try {

    const response = await fetch(
      "https://oauth.production.enode.io/oauth2/token",
      {
        method: "POST",

        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              a4dd7f4b-4452-4487-8654-9e93827c9ce2 + ":" + 9684660118740aff9f063ed3b0330ff10b29c289
            ).toString("base64"),

          "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body: "grant_type=client_credentials"
      }
    );

    const data = await response.json();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
