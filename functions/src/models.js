const { db } = require("../firebase");

// Donations Model
class Donation {
  constructor(id, data) {
    this.id = id;
    this.amount = data.amount;
    this.receiverId = data.receiverId;
    this.donorId = data.donorId;
    this.message = data.message;
  }

  static async create(data) {
    const docRef = await db.collection("donations").add(data);
    return new Donation(docRef.id, data);
  }

  static async findById(id) {
    const doc = await db.collection("donations").doc(id).get();
    return doc.exists ? new Donation(doc.id, doc.data()) : null;
  }

  static async findAll() {
    const snapshot = await db.collection("donations").get();
    return snapshot.docs.map((doc) => new Donation(doc.id, doc.data()));
  }

  static async update(id, data) {
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
    this.message = data.message;
    this.userId = data.userId;
  }

  static async create(data) {
    const docRef = await db.collection("feedback").add(data);
    return new Feedback(docRef.id, data);
  }

  static async findAll() {
    const snapshot = await db.collection("feedback").get();
    return snapshot.docs.map((doc) => new Feedback(doc.id, doc.data()));
  }
}

// Receivers Model
class Receiver {
  constructor(id, data) {
    this.id = id;
    this.name = data.name;
    this.contactInfo = data.contactInfo;
  }

  static async create(data) {
    const docRef = await db.collection("receivers").add(data);
    return new Receiver(docRef.id, data);
  }

  static async findAll() {
    const snapshot = await db.collection("receivers").get();
    return snapshot.docs.map((doc) => new Receiver(doc.id, doc.data()));
  }
}

// Volunteers Model
class Volunteer {
  constructor(id, data) {
    this.id = id;
    this.name = data.name;
    this.contactInfo = data.contactInfo;
  }

  static async create(data) {
    const docRef = await db.collection("volunteers").add(data);
    return new Volunteer(docRef.id, data);
  }

  static async findAll() {
    const snapshot = await db.collection("volunteers").get();
    return snapshot.docs.map((doc) => new Volunteer(doc.id, doc.data()));
  }
}

// User Model
class User {
  constructor(id, data) {
    this.id = id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role; // For example: admin, donor, receiver, volunteer, etc.
  }

  static async create(data) {
    const docRef = await db.collection("users").add(data); // Storing user role
    return new User(docRef.id, data);
  }

  static async findById(id) {
    const doc = await db.collection("users").doc(id).get();
    return doc.exists ? new User(doc.id, doc.data()) : null;
  }

  static async findAll() {
    const snapshot = await db.collection("users").get();
    return snapshot.docs.map((doc) => new User(doc.id, doc.data()));
  }

  static async update(id, data) {
    await db.collection("users").doc(id).update(data);
  }

  static async delete(id) {
    await db.collection("users").doc(id).delete();
  }
}

module.exports = {
  Donation,
  Feedback,
  Receiver,
  Volunteer,
  User,
};
