
const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Middleware za provjeru administratorskih ovlasti
const checkAdmin = async (req, res, next) => {
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.admin === true) {
      next();
    } else {
      res.status(403).send('Access denied');
    }
  } catch (error) {
    res.status(403).send('Error verifying token');
  }
};

// Ruta za dohvaćanje svih korisnika (samo za administratore)
router.get('/getUsers', checkAdmin, async (req, res) => {
  const maxResults = 1000; // Maksimalan broj korisnika koji se mogu dohvatiti
  try {
    const listUsersResult = await admin.auth().listUsers(maxResults);
    res.send(listUsersResult.users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

// Ruta za postavljanje korisnika kao administratora
router.post('/setAdmin/:uid', checkAdmin, async (req, res) => {
  const uid = req.params.uid;
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    res.json({ message: `User ${uid} has been set as an admin.` }); // Vratite JSON odgovor
  } catch (error) {
    console.error('Error setting admin:', error);
    res.status(500).json({ error: 'Error setting admin' });
  }
});

router.delete('/deleteUser/:uid', checkAdmin, async (req, res) => {
  const uid = req.params.uid;
  try {
    await admin.auth().deleteUser(uid);
    res.json({ message: `Korisnik ${uid} je obrisan.` }); 
  } catch (error) {
    console.error('Greška prilikom brisanja korisnika:', error);
    res.status(500).json({ error: 'Greška prilikom brisanja korisnika' });
  }
});

module.exports = router;
