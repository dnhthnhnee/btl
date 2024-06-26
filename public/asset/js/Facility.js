import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, addDoc, doc, setDoc, updateDoc, collection, connectFirestoreEmulator, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

await getDocs(collection(db, "thiet bi")).then(async (querySnapshot) => {
    let dataHtml = '';
    await querySnapshot.forEach((doc) => {
        dataHtml += `<div>
        <h3>${doc.id}</h3>
        <button class="doc-button" data-doc-id="${doc.id}">Chi tiết</button>
    </div>`;
    });
    const mainContent = document.querySelector('.content3');

    // Append the data HTML to the main-content div
    mainContent.innerHTML = dataHtml;
    $(".doc-button").on("click", function () {
        const docId = $(this).attr("data-doc-id");
        alert(docId);
        window.location.href = `DisplayFacility.html?docId=${docId}`;
    });
});