const { db } = require("./firebase");

// User Model
class User {
  constructor(id, data) {
    this.id = id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    // this.phoneNumber = data.phoneNumber;
    // this.address = data.address;
    // this.latitude = data.latitude;
    // this.longitude = data.longitude;
  }

  static async create(data) {
    const docRef = await db.collection("User").add(data);
    return new User(docRef.id, data);
  }

  static async findById(id) {
    const doc = await db.collection("User").doc(id).get();
    return doc.exists ? new User(doc.id, doc.data()) : null;
  }

  static async findAll() {
    const snapshot = await db.collection("User").get();
    return snapshot.docs.map((doc) => new User(doc.id, doc.data()));
  }

  static async update(id, data) {
    await db.collection("User").doc(id).update(data);
  }

  static async delete(id) {
    await db.collection("User").doc(id).delete();
  }
}

// donati Model
class donation {
  constructor(id, data) {
    this.id = id;
    this.donorId = data.donorId;
    this.receiverId = data.receiverId;
    this.foodForPeople = data.foodForPeople;
    this.foodUsedFor = data.foodUsedFor;
    this.description = data.description;
    this.expiry = data.expiry;
    this.canDeliver = data.canDeliver;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async create(data) {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const docRef = await db.collection("donations").add(data);
    return new donation(docRef.id, data);
  }

  static async findById(id) {
    const doc = await db.collection("donations").doc(id).get();
    return doc.exists ? new donation(doc.id, doc.data()) : null;
  }

  static async findAll() {
    const snapshot = await db.collection("donations").get();
    return snapshot.docs.map((doc) => new donation(doc.id, doc.data()));
  }

  static async update(id, data) {
    data.updatedAt = new Date();
    await db.collection("donations").doc(id).update(data);
  }

  static async delete(id) {
    await db.collection("donations").doc(id).delete();
  }
}

// Feedback Model
class Feedback {
  constructor(id, data) {
    this.id = id;
    this.donationId = data.donationId;
    this.receiverId = data.receiverId;
    this.experience = data.experience;
    this.peopleFed = data.peopleFed;
    this.photos = data.photos;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async create(data) {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const docRef = await db.collection("feedback").add(data);
    return new Feedback(docRef.id, data);
  }

  static async findAll() {
    const snapshot = await db.collection("feedback").get();
    return snapshot.docs.map((doc) => new Feedback(doc.id, doc.data()));
  }
}

// Notification Model
class Notification {
  constructor(id, data) {
    this.id = id;
    this.userId = data.userId;
    this.donationId = data.donationId;
    this.message = data.message;
    this.read = data.read;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async create(data) {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    data.read = false;
    const docRef = await db.collection("Notification").add(data);
    return new Notification(docRef.id, data);
  }

  static async findAll() {
    const snapshot = await db.collection("Notification").get();
    return snapshot.docs.map((doc) => new Notification(doc.id, doc.data()));
  }
}

// Receiver Model (as a subcollection of U)
class Receiver {
  constructor(userId, data) {
    this.userId = userId;
    this.approxPeopleFed = data.approxPeopleFed;
    this.bioData = data.bioData;
  }

  static async create(userId, data) {
    await db.collection("User").doc(userId).collection("receivers").add(data);
    return new Receiver(userId, data);
  }

  static async findByUserId(userId) {
    const snapshot = await db
      .collection("User")
      .doc(userId)
      .collection("receivers")
      .get();
    const doc = snapshot.docs[0];
    return doc ? new Receiver(userId, doc.data()) : null;
  }
}

// Volunteer Model (as a subcollection of U)
class Volunteer {
  constructor(userId, data) {
    this.userId = userId;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.active = data.active;
  }

  static async create(userId, data) {
    await db.collection("User").doc(userId).collection("volunteers").add(data);
    return new Volunteer(userId, data);
  }

  static async findByUserId(userId) {
    const snapshot = await db
      .collection("User")
      .doc(userId)
      .collection("volunteers")
      .get();
    const doc = snapshot.docs[0];
    return doc ? new Volunteer(userId, doc.data()) : null;
  }
}

module.exports = {
  User,
  donation,
  Feedback,
  Notification,
  Receiver,
  Volunteer,
};
