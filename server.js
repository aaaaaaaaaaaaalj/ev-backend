const express = require("express");
const fetch = require("node-fetch");

const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;


app.get("/", (req, res) => {
  res.send("Backend Enode OK");
});

app.get("/token", async (req, res) => {

  try {

    const response = await fetch(
      "https://oauth.sandbox.enode.io/oauth2/token",
      {
        method: "POST",

        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              CLIENT_ID + ":" + CLIENT_SECRET
            ).toString("base64"),

          "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body: "grant_type=client_credentials"
      }
    );

    const data = await response.json();

    res.json(data);
    const express = require("express");
const fetch = require("node-fetch");

const app = express();

const CLIENT_ID = "TON_CLIENT_ID";
const CLIENT_SECRET = "TON_CLIENT_SECRET";

async function getAccessToken() {

  const response = await fetch(
    "https://oauth.sandbox.enode.io/oauth2/token",
    {
      method: "POST",

      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            CLIENT_ID + ":" + CLIENT_SECRET
          ).toString("base64"),

        "Content-Type":
          "application/x-www-form-urlencoded"
      },

      body: "grant_type=client_credentials"
    }
  );

  const data = await response.json();

  return data.access_token;
}

app.get("/", (req, res) => {
  res.send("Backend Enode OK");
});

app.get("/link", async (req, res) => {

  try {

    const token = await getAccessToken();

    const response = await fetch(
      "https://enode-api.sandbox.enode.io/users",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          vendorType: "TESLA"
        })
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
