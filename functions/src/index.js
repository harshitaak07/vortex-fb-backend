const functions = require("firebase-functions");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const donorRoutes = require("./routes/donorRoutes");
const receiverRoutes = require("./routes/receiverRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
// ... other route imports as needed

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/donations", donorRoutes);
app.use("/api/receivers", receiverRoutes);
app.use("/api/volunteers", volunteerRoutes);

exports.api = functions.https.onRequest(app);
