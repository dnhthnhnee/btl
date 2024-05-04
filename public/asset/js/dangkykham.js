import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, addDoc, doc, setDoc, updateDoc, collection, connectFirestoreEmulator, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class Patient{
    constructor() {
        let data= {};
        this.addProperty = function(key, val){
            data[key] = val;
        }
        this.getdata = function(){
            return data;
        }
        this.getAt= function(key){
            return data[key];
        } 
    }
}
var temp = new Patient();

$("#Send").on("click", async function(){
    // nhận dữ liệu đầu vào
    temp.addProperty('Name',$("#name").val());
    temp.addProperty('Email',$("#email").val());
    temp.addProperty('Birth',new Date($("#birth").val()));
    temp.addProperty('Phone',$("#phonum").val());
    temp.addProperty('Sex',$("#Gerne").val());
    temp.addProperty('Addr',$("#addr").val());
    temp.addProperty('Dept', $("#khoa").val());
    temp.addProperty('Sick',$("#sick").val());
    temp.addProperty('Appt', new Date( $("#ngaykham").val()+$("#buoi").val() ));

    var doctorIds = [];
    //alert(temp.getAt('Appt'));
    const querySnapshot =  await getDocs(collection(db, "CBYT", "Doctor", temp.getAt('Dept') ));
    querySnapshot.forEach((doc) => {
        doctorIds.push(doc.id);
    });
    console.log(doctorIds);
    console.log(temp.getAt('Appt'));
    const Ref = doc(db, "benh nhan", "Khám", temp.getAt('Dept') , temp.getAt('Email'));
    //alert("hello1");
    //alert(demo.getdata());
    // Sử dụng hàm updateDoc để cập nhật dữ liệu
    try{
        addEventToFirstAvailableSubcollection(db, doctorIds, temp );
    }
    catch (error) {
        //showAlert();
        //console.error("Lỗi:", error);
        alert(error);
    }

    try{
        setDoc( Ref, temp.getdata() );
        console.log("Document đã được cập nhật thành công!");
    } 
    catch (error) {
        console.error("Lỗi khi cập nhật document:", error);
    }
    alert("XONG NGÀY");
});

async function addEventToFirstAvailableSubcollection(db, subCollections, obj ) {
    console.log( 'docData.fal:', obj.getAt('Dept') );
    console.log( 'subCollections[i]:', subCollections[0] );
    console.log( 'time:', obj.getAt('Appt') );
    for (let i = 0; i < subCollections.length; i++) {
      const docRef = doc( db, "calendar", obj.getAt('Dept'), subCollections[i], String(obj.getAt('Appt')) );
      const docSnap = await getDoc(docRef);
      console.log(docRef.id);

      if (!docSnap.exists()) {
        // Document does not exist in this subcollection, so we add it here and exit the function
        await setDoc(docRef, obj.getdata() );
        console.log(`Document added to subcollection ${subCollections[i]}`);
        return;
      }
    }
  
    throw Error('Giờ bạn chọn đã kín lịch, vui lòng chọn giờ khác!');
}

