import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
// Add Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import { getDatabase, ref, set  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js';
const firebaseConfig = {
    apiKey: "AIzaSyDDSWubzk0D2gRjDXwv5E580WjTHvJwysc",
    authDomain: "assignmenthospital-7d804.firebaseapp.com",
    databaseURL: "https://assignmenthospital-7d804-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "assignmenthospital-7d804",
    storageBucket: "assignmenthospital-7d804.appspot.com",
    messagingSenderId: "573486781105",
    appId: "1:573486781105:web:7d7cb8721bb8a1728a0890",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const database = getDatabase();


let patience = {
    Card: ,
    Insurance_number: ,
    username: ,
    email: ,
    addresss: ,
    phone : , 
    Health: ,
    schedule: medicalAppointment
}
let doctor = {
    ID: ,
    Card: ,
    Name: ,
    email: ,
    addresss: ,
    phone : , 
    Timetable: ,
    Medical_speciality: ,
    Medical_professional: 
}

let Nurse = {
  ID: ,
  Card: ,
  Name: ,
  email: ,
  addresss: ,
  phone : , 
  Timetable: ,
  Task: 
}

let Medicine_and_MedicalEquipment {

  type: ,
  name: ,
  count: ,
  status: ,
}

function SignIn(email, password){
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

function SignUp(email, password){
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

function writePatiencerData(patienceId, IDcard, SocialInsuranceNumber, name, email, phonenumber, address, healthProblem, medicalAppointment, imageUrl) {
  set(ref(database, 'patience/' + patienceId), {
    Card: IDcard,
    Insurance_number: SocialInsuranceNumber,
    username: name,
    email: email,
    addresss: address,
    profile_picture : imageUrl,
    phone : phonenumber, 
    Health: healthProblem,
    schedule: medicalAppointment
  });
}




