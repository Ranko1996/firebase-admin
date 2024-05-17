const admin = require('firebase-admin');
const path = require('path');

// Koristite path modul za definiranje putanje do JSON datoteke
const serviceAccountPath = path.resolve("C:\\Users\\kotur\\Downloads\\key.json");
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const setCustomUserClaims = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`Custom claims set for user ${uid}`);
  } catch (error) {
    console.error('Error setting custom claims:', error);
  }
};

// Primjer poziva funkcije s korisničkim UID-om
const userUid = 'fGuxRWXebzMWqHrsOiU5pPHiOD23'; // Zamijenite s pravim UID-om korisnika
setCustomUserClaims(userUid);
