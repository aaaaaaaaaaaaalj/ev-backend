const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// =========================
// Accueil
// =========================

app.get("/", (req, res) => {
  res.send("Backend Smartcar OK");
});

// =========================
// Générer URL Smartcar Connect
// =========================

app.get("/link", async (req, res) => {

  const scopes = [
    "read_vehicle_info",
    "read_odometer",
    "read_battery",
    "read_charge",
    "read_location"
  ].join(" ");

  const url =
    `https://connect.smartcar.com/oauth/authorize` +
    `?response_type=code` +
    `&application_id=adc72f27-5207-4269-9737-5dcff1db5977` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(scopes)}`;

  res.json({
    connect_url: url
  });
});


// =========================
// Callback Smartcar
// =========================

app.get("/exchange", async (req, res) => {

  try {

    const code = req.query.code;

    if (!code) {
      return res.status(400).json({
        error: "Missing code"
      });
    }

    const response = await fetch(
      "https://auth.smartcar.com/oauth/token",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body:
          `grant_type=authorization_code` +
          `&code=${code}` +
          `&client_id=${CLIENT_ID}` +
          `&client_secret=${CLIENT_SECRET}` +
          `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
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
// Véhicules
// =========================

app.get("/vehicles", async (req, res) => {

  try {

    const accessToken = req.query.token;

    const response = await fetch(
      "https://api.smartcar.com/v2.0/vehicles",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
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
// Batterie EV
// =========================

app.get("/battery", async (req, res) => {

  try {

    const vehicleId = req.query.vehicleId;
    const accessToken = req.query.token;

    const response = await fetch(
      `https://api.smartcar.com/v2.0/vehicles/${vehicleId}/battery`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
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
