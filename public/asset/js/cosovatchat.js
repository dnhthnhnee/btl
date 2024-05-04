import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getAuth,  onAuthStateChanged, signInWithEmailAndPassword, signOut  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'
import {  getFirestore, doc, setDoc, deleteDoc, getDoc, getDocs, collection, writeBatch  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";
import { CurrentUser, checkAuthstate } from './register.js';

checkAuthstate().then(() => {
  console.log(CurrentUser.uid); // Now currentUser should be available
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
let currentDocId = "";
const user = auth.currentUser;
await getDocs(collection(db, "thiet bi")).then((querySnapshot) => {
    let dataHtml = `<button id="tb-button" type="button">Thiết bị</button>`;
    dataHtml += `<button id="t-button" type="button">Thuốc</button>`;
    // Select the main-content div
    const mainContent = document.querySelector('.content1');
    console.log("CurrentUser.fal: ", CurrentUser.uid);
    // Append the data HTML to the main-content div
    mainContent.innerHTML = dataHtml;
});
$("#tb-button").on("click", async function(){
    window.location.href = "Facility.html";
});
$("#t-button").on("click", async function(){
    window.location.href = "medicine.html";
});