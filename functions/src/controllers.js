const {
  Donation,
  Feedback,
  Notification,
  Receiver,
  Volunteer,
  User,
} = require("./models");
const { auth } = require("../firebase");

// User Controller
class UserController {
  static async createUser(req, res) {
    try {
      const { email, password, role } = req.body;
      const userRecord = await auth.createUser({
        email,
        password,
      });

      const userData = {
        name: req.body.name,
        email: userRecord.email,
        role: role,
      };

      const user = await User.create(userData);

      if (role === "receiver") {
        await Receiver.create(user.id, {
          approxPeopleFed: req.body.approxPeopleFed,
          bioData: req.body.bioData,
        });
      } else if (role === "volunteer") {
        await Volunteer.create(user.id, {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          active: true,
        });
      }

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
      const userData = req.body;
      const authUser = req.user;
      await User.update(authUser.uid, userData);
      const updatedUser = await User.findById(authUser.uid);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const authUser = req.user;
      await auth.deleteUser(authUser.uid);
      await User.delete(authUser.uid);
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

// Donor Controller
class DonorController {
  static async createDonation(req, res) {
    try {
      const authUser = req.user;
      const donationData = {
        ...req.body,
        donorId: authUser.uid,
        status: "pending",
      };
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
      const authUser = req.user;
      const id = req.params.id;
      const donation = await Donation.findById(id);

      if (donation.donorId !== authUser.uid) {
        return res
          .status(403)
          .json({ error: "Not authorized to update this donation" });
      }

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
      const authUser = req.user;
      const id = req.params.id;
      const donation = await Donation.findById(id);

      if (donation.donorId !== authUser.uid) {
        return res
          .status(403)
          .json({ error: "Not authorized to delete this donation" });
      }

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
      const authUser = req.user;
      const receiverData = req.body;
      await Receiver.create(authUser.uid, receiverData);
      const updatedReceiver = await Receiver.findByUserId(authUser.uid);
      return res.status(200).json(updatedReceiver);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async addFeedback(req, res) {
    try {
      const authUser = req.user;
      const feedbackData = {
        ...req.body,
        receiverId: authUser.uid,
      };
      const feedback = await Feedback.create(feedbackData);
      return res.status(201).json(feedback);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getAllDonors(req, res) {
    try {
      const donors = await User.findAll();
      return res
        .status(200)
        .json(donors.filter((user) => user.role === "donor"));
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

// Volunteer Controller
class VolunteerController {
  static async getNotifications(req, res) {
    try {
      const authUser = req.user;
      const notifications = await Notification.findAll();
      return res
        .status(200)
        .json(
          notifications.filter(
            (notification) => notification.userId === authUser.uid
          )
        );
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async notifyVolunteers(req, res) {
    try {
      const authUser = req.user;
      const notificationData = {
        ...req.body,
        userId: authUser.uid,
      };
      const notification = await Notification.create(notificationData);
      return res.status(201).json(notification);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateVolunteerStatus(req, res) {
    try {
      const authUser = req.user;
      const { active } = req.body;
      await Volunteer.create(authUser.uid, { active });
      const updatedVolunteer = await Volunteer.findByUserId(authUser.uid);
      return res.status(200).json(updatedVolunteer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = {
  UserController,
  DonorController,
  ReceiverController,
  VolunteerController,
};
