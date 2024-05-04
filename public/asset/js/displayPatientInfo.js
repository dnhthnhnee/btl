import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, addDoc, doc, setDoc, updateDoc, collection, connectFirestoreEmulator, getDocs, getDoc, query, where } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";
import { CurrentUser, checkAuthstate} from './register.js';
//import { patientID, init } from './PatientManagement.js';
await checkAuthstate().then(() => {
  console.log(CurrentUser.uid); // Now currentUser should be available
});
const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get('docId');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let fal = {};
const docref = doc( db, "CBYT", CurrentUser.uid);
      const docsnap = await getDoc(docref);
      console.log(docref.id);

      if (docsnap.exists()) {
        fal = docsnap.data()["Khoa"];
        console.log(fal);
      }
      const docRef = doc(db, "benh nhan", "Khám", fal, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          let dataHtml = `<div>
              <h3>Họ tên: ${docSnap.data()["Name"]}</h3>
              <h3>Giới tính: ${docSnap.data()["Sex"]}</h3>
              <h3>Ngày sinh: ${docSnap.data()["Birth"]}</h3>
              <h3>Địa chỉ: ${docSnap.data()["Addr"]}</h3>
              <h3>SĐT: ${docSnap.data()["Phone"]}</h3>
              <h3>Email: ${docSnap.data()["Email"]}</h3>
              <h3>Triệu chứng ban đầu: ${docSnap.data()["Sick"]}</h3>
          </div>`;
      
          const mainContent = document.querySelector('.content5');
          // Append the data HTML to the main-content div
          mainContent.innerHTML = dataHtml;
      } else {
          console.log("No such document!");
      }