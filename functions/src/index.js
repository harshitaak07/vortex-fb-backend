const functions = require("firebase-functions");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
// ... other route imports

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
// ... other route uses

exports.api = functions.https.onRequest(app);
