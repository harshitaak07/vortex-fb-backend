const admin = require("firebase-admin");
const serviceAccount = require("C:/Users/harsh/Downloads/vortex-77060-firebase-adminsdk-mtqbi-955f967a7f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vortex-77060.firebaseio.com",
});

const db = admin.firestore();

module.exports = { admin, db };
