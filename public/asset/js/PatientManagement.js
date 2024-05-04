import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, addDoc, doc, setDoc, updateDoc, collection, connectFirestoreEmulator, getDocs, getDoc, query, where } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";
import { CurrentUser, checkAuthstate } from './register.js';

await checkAuthstate().then(() => {
  console.log(CurrentUser.uid); // Now currentUser should be available
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let fal = {};
const docRef = doc( db, "CBYT", CurrentUser.uid);
      const docSnap = await getDoc(docRef);
      console.log(docRef.id);

      if (docSnap.exists()) {
        fal = docSnap.data()["Khoa"];
        console.log(fal);
      }


await getDocs(collection(db, "benh nhan", "Khám", fal)).then(async (querySnapshot) => {
    let dataHtml ='';
    await querySnapshot.forEach((doc) => {
        if (doc.data()["DoctorID"] == CurrentUser.uid){
        dataHtml += `<div>
        <h3>${doc.data()["Name"]}</h3>
        <button class="doc-button" id="${doc.id}">Chi tiết</button>
    </div>`;
        }
    });
    const mainContent = document.querySelector('.content4');
    // Append the data HTML to the main-content div
    mainContent.innerHTML = dataHtml;
    $(".doc-button").on("click", function(){
        const docId = $(this).attr("id");
        alert(docId);
        window.location.href = `DisplayPatientInfo.html?docId=${docId}`;
    });
});



  
