const functions = require("firebase-functions");
const express = require("express");

const {
  DonorController,
  ReceiverController,
  UserController,
  VolunteerController,
} = require("../controllers");
const authenticate = require("../middleware/auth");
const { sendNotification } = require("./notifications");

const app = express();
app.use(express.json());

// User Routes
app.post("/api/users/user/create", UserController.createUser);
app.get("/api/users/user/:id", authenticate, UserController.getUserById);
app.put("/api/users/user/update", authenticate, UserController.updateUser);
app.delete("/api/users/user/delete", authenticate, UserController.deleteUser);
app.get("/api/users/get", authenticate, UserController.getAllUsers);

// Donor Routes
app.post(
  "/api/donations/donation/create",
  authenticate,
  DonorController.createDonation
);
app.get("/api/donations/getAll", authenticate, DonorController.getAllDonations);
app.get(
  "/api/donations/donation/getById/:id",
  authenticate,
  DonorController.getDonationById
);
app.put(
  "/api/donations/donation/update/:id",
  authenticate,
  DonorController.updateDonation
);
app.delete(
  "/api/donations/donation/delete/:id",
  authenticate,
  DonorController.deleteDonation
);

// Receiver Routes
app.put(
  "/api/receivers/receiver/profile",
  authenticate,
  ReceiverController.updateProfile
);
app.post(
  "/api/receivers/receiver/feedback",
  authenticate,
  ReceiverController.addFeedback
);
app.get(
  "/api/receivers/receivers/donors",
  authenticate,
  ReceiverController.getAllDonors
);

// Volunteer Routes
app.get(
  "/api/volunteers/volunteer/notifications",
  authenticate,
  VolunteerController.getNotifications
);
app.post(
  "/api/volunteers/volunteer/notify",
  authenticate,
  VolunteerController.notifyVolunteers
);
app.put(
  "/api/volunteers/volunteer/status",
  authenticate,
  VolunteerController.updateVolunteerStatus
);

// Notification Route
app.post("/api/send-notification", authenticate, async (req, res) => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res
      .status(400)
      .json({ error: "Token, title, and body are required." });
  }

  try {
    const response = await sendNotification(token, title, body);
    return res.status(200).json({ success: true, response });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send notification." });
  }
});

// Export the API
exports.api = functions.https.onRequest(app);
