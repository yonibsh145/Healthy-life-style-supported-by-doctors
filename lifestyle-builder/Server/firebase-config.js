
const {initializeApp, cert} = require('firebase-admin');
const {getFirestore} = require('firebase-admin/firestore');

const serviceAccount = require('life-style-builder-firebase-adminsdk-pm2e2-f8dd014625.json');

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()

module.exports = {db}