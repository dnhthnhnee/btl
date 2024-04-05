import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'

    // If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
    import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js'

    // Add Firebase products that you want to use
    import { getAuth } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'
    import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
const firebaseConfig = {
    apiKey: "AIzaSyDDSWubzk0D2gRjDXwv5E580WjTHvJwysc",
    authDomain: "assignmenthospital-7d804.firebaseapp.com",
    databaseURL: "https://assignmenthospital-7d804-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "assignmenthospital-7d804",
    storageBucket: "assignmenthospital-7d804.appspot.com",
    messagingSenderId: "573486781105",
    appId: "1:573486781105:web:7d7cb8721bb8a1728a0890",
    measurementId: "G-T53SH2EZPF"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);