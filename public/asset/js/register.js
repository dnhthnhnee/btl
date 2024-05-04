import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getAuth,  onAuthStateChanged, signInWithEmailAndPassword, signOut  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'
import {  getFirestore, doc, setDoc, deleteDoc, getDoc, getDocs, collection, writeBatch  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
let CurrentUser = {
  patientID: "",
};
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
  await SignIn(Email, Password);
  await checkAuthstate("");
  console.log(CurrentUser.uid);
});

$("#logout").on("click", async function(){
  await SignOut();
  const CurrentUser = await checkAuthstate();
  console.log(CurrentUser.getAuth.uid);
});

function checkAuthstate(){
  return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
              // User is signed in
              const uid = user.uid;
              CurrentUser = user;
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
async function SignIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      throw error; // or return something else
    });
}

function SignOut(){
    return signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
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


export { CurrentUser, checkAuthstate };
  