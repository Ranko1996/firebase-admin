// const admin = require('firebase-admin');
// const path = require('path');

// // Koristite path modul za definiranje putanje do JSON datoteke
// const serviceAccountPath = path.resolve("C:\\Users\\kotur\\Downloads\\key.json");
// const serviceAccount = require(serviceAccountPath);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const setCustomUserClaims = async (uid) => {
//   try {
//     await admin.auth().setCustomUserClaims(uid, { admin: true });
//     console.log(`Custom claims set for user ${uid}`);
//   } catch (error) {
//     console.error('Error setting custom claims:', error);
//   }
// };

// // Primjer poziva funkcije s korisničkim UID-om
// const userUid = 'fGuxRWXebzMWqHrsOiU5pPHiOD23'; // Zamijenite s pravim UID-om korisnika
// setCustomUserClaims(userUid);

const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const cors = require('cors');
const adminRoutes = require('./routes/admin');

// Koristite path modul za definiranje putanje do JSON datoteke
const serviceAccountPath = path.resolve("C:\\Users\\kotur\\Downloads\\key.json");
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true })); // Dodajte 'credentials: true'

app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
