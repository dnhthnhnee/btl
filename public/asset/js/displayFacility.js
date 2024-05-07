import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, addDoc, doc, setDoc, updateDoc, collection, connectFirestoreEmulator, getDocs, getDoc, query, where } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";
//import { CurrentUser, checkAuthstate } from './register.js';
//import { patientID, init } from './PatientManagement.js';

const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get('docId');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const docRef = doc(db, "thiet bi", docId);
const docSnap = await getDoc(docRef);

function ToDate(t) {
    var m = (t.getMonth() + 1 < 10) ? '0' + (t.getMonth() + 1).toString() : (t.getMonth() + 1).toString();
    var d = (t.getDate() < 10) ? '0' + (t.getDate()).toString() : (t.getDate()).toString();
    return `${d}/${m}/${t.getFullYear()}`;
}

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    let dataHtml = `<div>
              <h3>Số lượng: ${docSnap.data()["số lượng"]}</h3>
              <h3>Số lượng sẵn có: ${docSnap.data()["số lượng sẵn có"]}</h3>
              <h3>Số lượng hư hỏng: ${docSnap.data()["số lượng hư hỏng"]}</h3>
              <h3>LSBD: </h3>
          </div>`;
    docSnap.data()["LSBD"].forEach((appointment) => {
        appointment = appointment.toDate();
        dataHtml += `<div>
                      <h3>-  ${ToDate(appointment)} - ${appointment.getHours()}:${appointment.getMinutes()}</h3>
              </div>`;
    });

    const mainContent = document.querySelector('.content7');
    // Append the data HTML to the main-content div
    mainContent.innerHTML = dataHtml;
} else {
    console.log("No such document!");
}



document.getElementById('BaoDuong').addEventListener('submit', async function (event) {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Get the input values
    let BD = document.getElementById('NgayBD').value;

    // Convert the date strings to Date objects
    BD = new Date(BD);

    // Convert the quantity to a number

    const docSnap = await getDoc(docRef);
    let LSBD = docSnap.data()["LSBD"];
    LSBD.push(BD);
    LSBD.sort((a, b) => a - b);
    // Update the database
    await updateDoc(docRef, {
        LSBD: LSBD
    });

    console.log("Đã cập nhật thành công!");
});
