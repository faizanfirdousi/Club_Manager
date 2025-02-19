const admin = require("firebase-admin");
const path = require("path");

if (!admin.apps.length) {
  try {
    const serviceAccountPath = path.join(
      __dirname,
      "./kaizen-auth-20ca9-firebase-adminsdk-fbsvc-a8409b66c3.json"
    );
    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
    throw error;
  }
}

module.exports = admin;
