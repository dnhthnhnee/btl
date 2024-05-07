import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, addDoc, doc, setDoc, updateDoc, collection, connectFirestoreEmulator, getDocs, getDoc, query, where } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";
import { CurrentUser, checkAuthstate } from './register.js';
//import { patientID, init } from './PatientManagement.js';
await checkAuthstate().then(() => {
  console.log(CurrentUser.uid); // Now currentUser should be available
});
const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get('docId');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let fal = {};
const docref = doc(db, "CBYT", CurrentUser.uid);
const docsnap = await getDoc(docref);
console.log(docref.id);

if (docsnap.exists()) {
  fal = docsnap.data()["Khoa"];
  console.log(fal);
}
const docRef = doc(db, "benh nhan", "Khám", fal, docId);
const docSnap = await getDoc(docRef);

const getAppointmentHistory = async (email, h) => {
  const q = await query(collection(db, "LSK"), where("ID benh nhan", "==", email));
  console.log(email);
  console.log(q);

  try {
    const querySnapshot = await getDocs(q);
    const appointmentHistory = [];

    await querySnapshot.forEach((doc) => {
      appointmentHistory.push({
        appt: doc.data()["Appt"].toDate()
      });
    });
    appointmentHistory.sort((a, b) => a.appt - b.appt);
    return appointmentHistory;
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử khám: ", error);
    return [];
  }
};

function ToDate(t) {
  var m = (t.getMonth() + 1 < 10) ? '0' + (t.getMonth() + 1).toString() : (t.getMonth() + 1).toString();
  var d = (t.getDate() < 10) ? '0' + (t.getDate()).toString() : (t.getDate()).toString();
  return `${d}/${m}/${t.getFullYear()}`;
}


if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  var birth = docSnap.data()["Birth"].toDate();
  var dataHtml = `<div>
              <h3>Họ tên: ${docSnap.data()["Name"]}</h3>
              <h3>Giới tính: ${docSnap.data()["Sex"]}</h3>
              <h3>Ngày sinh: ${ToDate(birth)}</h3>
              <h3>Địa chỉ: ${docSnap.data()["Addr"]}</h3>
              <h3>SĐT: ${docSnap.data()["Phone"]}</h3>
              <h3>Email: ${docSnap.data()["Email"]}</h3>
              <h3>Triệu chứng ban đầu: ${docSnap.data()["Sick"]}</h3>
              <h3>LSK:</h3>
          </div>`;
  const mainContent = document.querySelector('.content5');
  // Append the data HTML to the main-content div
  mainContent.innerHTML = dataHtml;
  getAppointmentHistory(docSnap.data()["Email"])
    .then((appointmentHistory) => {
      console.log("Lịch sử khám: ", appointmentHistory);
      appointmentHistory.forEach((appointment) => {
        dataHtml += `<div>
                  <h3>-  ${ToDate(appointment.appt)} - ${appointment.appt.getHours()}:${appointment.appt.getMinutes()}</h3>
          </div>`;
      });
      mainContent.innerHTML = dataHtml;

    })
    .catch((error) => {
      console.error("Lỗi khi lấy lịch sử khám: ", error);
    });

} else {
  console.log("No such document!");
}

