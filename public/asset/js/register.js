import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getAuth,  onAuthStateChanged, signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'
import {  getFirestore, doc, setDoc, deleteDoc, getDoc, getDocs, collection, writeBatch  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
var CurrentUser = {};

class Person {
    constructor(){
        this.name = "";
        this.cccd = 0;
        this.email= "";
        this.phonenum="";
    };
    addData(key,value){
        data[key] = value;
    }
    getData(){
        return this.data;
    }
    //virtual haha(){};
}

class doctor extends Person {

}

class nurse extends Person {

}

class hthcawo extends Person {

}

$("#reg").on("click", async function(){
  var Email = $("#user-email").val();
  var Password = $("#password").val();
  console.log(Email +" "+Password);
  SignIn(Email, Password);
  const CurrentUser = await checkAuthstate();
  console.log(CurrentUser);
});

function checkAuthstate(){
  return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
              // User is signed in
              console.log(user.email + " " + "has logged in");
              //changeDocumentName("VBriU3S0qlhkoopSpOqOcyIHHBs1", user.uid);
              //changeCollectionName("VBriU3S0qlhkoopSpOqOcyIHHBs1", user.uid);
              resolve(user);
          } else {
              // User is signed out
              resolve(null);
          }
      });
  });
}
function SignIn(email, password){
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  
}
async function changeDocumentName(oldId, newId) {
  // Get a reference to the old and new documents
  const oldDocRef = doc(db, 'CBYT', 'Doctor', 'Khoa A',  oldId);
  const newDocRef = doc(db, 'CBYT', 'Doctor', 'Khoa A', newId);

  // Get the data from the old document
  const docData = (await getDoc(oldDocRef)).data();

  // Write the data to the new document
  await setDoc(newDocRef, docData);

  // Delete the old document
  await deleteDoc(oldDocRef);
}

async function changeCollectionName(oldName, newName) {
  // Get a reference to the old and new collections
  const oldCollectionRef = collection(db, 'calendar', 'Khoa A', oldName);

  // Get all documents from the old collection
  const snapshot = await getDocs(oldCollectionRef);

  // Start a batch
  const batch = writeBatch(db);

  snapshot.docs.forEach((Doc) => {
      // For each doc, add a set operation to the batch
      const newDocRef = doc(db, 'calendar', 'Khoa A', newName, Doc.id);
      batch.set(newDocRef, Doc.data());

      // Add a delete operation to the batch
      const oldDocRef = doc(db, 'calendar', 'Khoa A', oldName, Doc.id);
      batch.delete(oldDocRef);
  });

  // Commit the batch
  await batch.commit();
}


export {CurrentUser};
  