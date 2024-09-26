const admin = require("firebase-admin");
const serviceAccount = require("C:\\Users\\aryan\\Downloads\\vortex-77060-firebase-adminsdk-mtqbi-c3eeb947ab.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vortex-77060.firebaseio.com",
});

const db = admin.firestore();

module.exports = { admin, db };
