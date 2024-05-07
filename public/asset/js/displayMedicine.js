import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, addDoc, doc, setDoc, updateDoc, collection, connectFirestoreEmulator, getDocs, getDoc, query, where } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";
//import { CurrentUser, checkAuthstate } from './register.js';
//import { patientID, init } from './PatientManagement.js';

const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get('docId');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const docRef = doc(db, "thuoc", docId);
const docSnap = await getDoc(docRef);

function ToDate(t) {
    var m = (t.getMonth() + 1 < 10) ? '0' + (t.getMonth() + 1).toString() : (t.getMonth() + 1).toString();
    var d = (t.getDate() < 10) ? '0' + (t.getDate()).toString() : (t.getDate()).toString();
    return `${d}/${m}/${t.getFullYear()}`;
}

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    var myMap = docSnap.data()["nhap_xuat"];
    var HSD = docSnap.data()["HSD"].toDate();
    var nhap = myMap.nhap.toDate();
    var xuat = myMap.xuat.toDate();

    let dataHtml = `<div>
              <h3>Hạn sử dụng: ${ToDate(HSD)}</h3>
              <h3>Số lượng: ${docSnap.data()["so luong"]}</h3>
              <h3>Thời gian nhập: ${ToDate(nhap)}</h3>
              <h3>Thời gian xuất: ${ToDate(xuat)}</h3>
          </div>`;

    const mainContent = document.querySelector('.content6');
    // Append the data HTML to the main-content div
    mainContent.innerHTML = dataHtml;
} else {
    console.log("No such document!");
}


document.getElementById('submit').addEventListener('click', function () {
    let quantity = document.getElementById('quantity').value;
    if (quantity >= 0) {
        // Convert the quantity to a number
        quantity = Number(quantity);

        // Get the current quantity from the database
        let currentQuantity = docSnap.data()["so luong"];

        // Subtract the quantity taken from the current quantity
        let newQuantity = currentQuantity - quantity;

        // Update the quantity in the database
        if (newQuantity >= 0) {
            updateDoc(docRef, {
                "so luong": newQuantity
            }).then(() => {
                console.log("Document successfully updated!");
            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
        }
        else {
            updateDoc(docRef, {
                "so luong": 0
            }).then(() => {
                console.log("Document successfully updated!");
            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
            console.log("Không đủ thuốc");
        }
    }
    else alert("Nhập số >=0");
});


document.getElementById('nhapKhoForm').addEventListener('submit', async function (event) {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Get the input values
    let ngayNhap = document.getElementById('ngayNhap').value;
    let ngayXuat = document.getElementById('ngayXuat').value;
    let HSD = document.getElementById('HSD').value;
    let soLuong = document.getElementById('soLuong').value;

    // Convert the date strings to Date objects
    ngayNhap = new Date(ngayNhap);
    ngayXuat = new Date(ngayXuat);
    HSD = new Date(HSD);

    // Convert the quantity to a number
    soLuong = Number(soLuong);

    // Get the current 'nhap_xuat' object from the database
    const docSnap = await getDoc(docRef);
    let nhapXuat = docSnap.data()["nhap_xuat"];

    // Update the 'nhap', 'xuat' and 'so luong' values
    nhapXuat.nhap = ngayNhap;
    nhapXuat.xuat = ngayXuat;
    let currentSoLuong = docSnap.data()["so luong"];
    let newSoLuong = currentSoLuong + soLuong;

    // Update the database
    await updateDoc(docRef, {
        "nhap_xuat": nhapXuat,
        "so luong": newSoLuong,
        "HSD": HSD
    });

    console.log("Đã cập nhật thành công!");
});
