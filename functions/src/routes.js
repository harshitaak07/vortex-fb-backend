const express = require("express");
const router = express.Router();

const {
  DonorController,
  ReceiverController,
  UserController,
  VolunteerController,
} = require("../controllers");
const authenticate = require("../middleware/auth");

// User Routes
router.post("/user", UserController.createUser);
router.get("/user/:id", authenticate, UserController.getUserById);
router.put("/user/:id", authenticate, UserController.updateUser);
router.delete("/user/:id", authenticate, UserController.deleteUser);
router.get("/users", authenticate, UserController.getAllUsers);

// Donor Routes
router.post("/donation", authenticate, DonorController.createDonation);
router.get("/donations", authenticate, DonorController.getAllDonations);
router.get("/donation/:id", authenticate, DonorController.getDonationById);
router.put("/donation/:id", authenticate, DonorController.updateDonation);
router.delete("/donation/:id", authenticate, DonorController.deleteDonation);

// Receiver Routes
router.put("/receiver/:id", authenticate, ReceiverController.updateProfile);
router.post("/receiver/feedback", authenticate, ReceiverController.addFeedback);
router.get("/receivers/donors", authenticate, ReceiverController.getAllDonors);

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

module.exports = router;
