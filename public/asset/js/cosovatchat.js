import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, addDoc, doc, setDoc, updateDoc, collection, connectFirestoreEmulator, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let currentDocId = "";
await getDocs(collection(db, "thiet bi")).then((querySnapshot) => {
    let dataHtml = `<button id="tb-button" type="button">Thiết bị</button>`;
    dataHtml += `<button id="t-button" type="button">Thuốc</button>`;
    // Select the main-content div
    const mainContent = document.querySelector('.content1');

    // Append the data HTML to the main-content div
    mainContent.innerHTML = dataHtml;
});
$("#tb-button").on("click", async function(){
    window.location.href = "Facility.html";
});
$("#t-button").on("click", async function(){
    window.location.href = "medicine.html";
});