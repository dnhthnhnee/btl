import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import { getDatabase, ref, set  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyDDSWubzk0D2gRjDXwv5E580WjTHvJwysc",
    authDomain: "assignmenthospital-7d804.firebaseapp.com",
    databaseURL: "https://assignmenthospital-7d804-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "assignmenthospital-7d804",
    storageBucket: "assignmenthospital-7d804.appspot.com",
    messagingSenderId: "573486781105",
    appId: "1:573486781105:web:7d7cb8721bb8a1728a0890",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const database = getDatabase(app);
var dataRef = ref(database,'bacsi');

class MyObject {
  constructor() {
    this.data = {};
  }

  addProperty(key, value) {
    this.data[key] = value;
  }

  getData() {
    return this.data;
  }
}
const objectToWrite = new MyObject();

$("#send").click(funtion(){
    var email = $("#email").val();
    var password = $("#password").val();
    console.log(email);
    console.log(password);
    SignIn(email,password);
});

function SignIn(email, password){
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

function save() {
  let name      = document.getElementById('name').val();
  let id        = document.getElementById('id').val();
  let password  = document.getElementById('password').val();
  dataRef = ref(database,'/'+id);
  objectToWrite.addProperty(name, password);

  set(dataRef, objectToWrite.getData())
  .then(() => {
    console.log("Đã ghi đối tượng lên database thành công");
  })
  .catch((error) => {
    console.error("Lỗi khi ghi đối tượng lên database:", error);
  });
};