const express = require("express");
const router = express.Router();

const {
  DonorController,
  ReceiverController,
  UserController,
  VolunteerController,
} = require("../controllers");
const authenticate = require("../middleware/auth");
const { sendNotification } = require("./notifications");

// User Routes
router.post("/user", UserController.createUser);
router.get("/user/:id", authenticate, UserController.getUserById);
router.put("/user", authenticate, UserController.updateUser);
router.delete("/user", authenticate, UserController.deleteUser);
router.get("/users", authenticate, UserController.getAllUsers);

// Donor Routes
router.post("/donation", authenticate, DonorController.createDonation);
router.get("/donations", authenticate, DonorController.getAllDonations);
router.get("/donation/:id", authenticate, DonorController.getDonationById);
router.put("/donation/:id", authenticate, DonorController.updateDonation);
router.delete("/donation/:id", authenticate, DonorController.deleteDonation);

// Receiver Routes
router.put("/receiver/profile", authenticate, ReceiverController.updateProfile);
router.post("/receiver/feedback", authenticate, ReceiverController.addFeedback);
router.get("/receivers/donors", authenticate, ReceiverController.getAllDonors);

// Volunteer Routes
router.get(
  "/volunteer/notifications",
  authenticate,
  VolunteerController.getNotifications
);
router.post(
  "/volunteer/notify",
  authenticate,
  VolunteerController.notifyVolunteers
);
router.put(
  "/volunteer/status",
  authenticate,
  VolunteerController.updateVolunteerStatus
); // Added route to update volunteer status

// Notification Route
router.post("/send-notification", authenticate, async (req, res) => {
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

module.exports = router;
