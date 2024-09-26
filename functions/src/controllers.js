const { Donation, Feedback, Receiver, Volunteer, User } = require("./models");

// Donor Controller
class DonorController {
  static async createDonation(req, res) {
    try {
      const donationData = req.body;
      const donation = await Donation.create(donationData);
      return res.status(201).json(donation);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getAllDonations(req, res) {
    try {
      const donations = await Donation.findAll();
      return res.status(200).json(donations);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getDonationById(req, res) {
    try {
      const id = req.params.id;
      const donation = await Donation.findById(id);
      if (!donation) {
        return res.status(404).json({ error: "Donation not found" });
      }
      return res.status(200).json(donation);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateDonation(req, res) {
    try {
      const id = req.params.id;
      const donationData = req.body;
      await Donation.update(id, donationData);
      const updatedDonation = await Donation.findById(id);
      return res.status(200).json(updatedDonation);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteDonation(req, res) {
    try {
      const id = req.params.id;
      await Donation.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

// Receiver Controller
class ReceiverController {
  static async updateProfile(req, res) {
    try {
      const id = req.params.id;
      const receiverData = req.body;
      await Receiver.update(id, receiverData);
      const updatedReceiver = await Receiver.findById(id);
      return res.status(200).json(updatedReceiver);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async addFeedback(req, res) {
    try {
      const feedbackData = req.body;
      const feedback = await Feedback.create(feedbackData);
      return res.status(201).json(feedback);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getAllDonors(req, res) {
    try {
      const donors = await Donation.findAll();
      return res.status(200).json(donors);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

// User Controller
class UserController {
  static async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await User.create(userData);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.params.id;
      const userData = req.body;
      await User.update(id, userData);
      const updatedUser = await User.findById(id);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await User.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

// Volunteer Controller
class VolunteerController {
  static async getNotifications(req, res) {
    try {
      const userId = req.query.userId;
      const notifications = await Volunteer.findByUserId(userId); // Ensure this line refers to the correct model for notifications
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async notifyVolunteers(req, res) {
    try {
      const notificationData = req.body;
      const notification = await Volunteer.create(notificationData); // Ensure this line refers to the correct model for notifications
      return res.status(201).json(notification);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = {
  DonorController,
  ReceiverController,
  UserController,
  VolunteerController,
};
