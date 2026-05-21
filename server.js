const express = require("express");
const fetch = require("node-fetch");

const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// =========================
// Récupérer access token
// =========================

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

// =========================
// Route accueil
// =========================

app.get("/", (req, res) => {
  res.send("Backend Enode OK");
});

// =========================
// Tester token
// =========================

app.get("/token", async (req, res) => {

  try {

    const token = await getAccessToken();

    res.json({
      access_token: token
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

// =========================
// Créer utilisateur Enode
// =========================

app.get("/link", async (req, res) => {

  try {

    const token = await getAccessToken();

    const userId = "mon-user-123";

    const response = await fetch(
      `https://enode-api.sandbox.enode.io/users/${userId}/link`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          vendorType: "vehicle",

          scopes: [
            "vehicle:read:data",
            "vehicle:read:location",
            "vehicle:control:charging"
          ],

          language: "fr-FR",

          redirectUri: "https://google.com"
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

app.get("/vehicles", async (req, res) => {

  try {

    const token = await getAccessToken();

    const response = await fetch(
      "https://enode-api.sandbox.enode.io/vehicles",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
// =========================
// Démarrer serveur
// =========================

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
