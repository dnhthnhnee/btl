import firebaseConfig from "./fconfig.mjs";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, doc, getDocs, getDoc, collection, orderBy, query } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var time=[];

class event {
  constructor(appt, name, sex, sick, birth) {
    let obj = {
      start: appt,
      end: appt.slice(0, -2)+'30',//30 phút sau là hết khám
      title: "Khám bệnh nhân "+ name,
      sex: sex,
      sick: sick,
      birth: birth
    };

    this.getdata = function() {
      return obj;
    };

    this.setProperty = function(property, value) {
      if (obj.hasOwnProperty(property)) {
        obj[property] = value;
      } else {
        console.error(`Thuộc tính '${property}' không tồn tại`);
      }
    };
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  var calendarEl = document.getElementById('calendar');
  var today = new Date().toISOString().substring(0,10);
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    initialDate: today,
    headerToolbar: {
      left: 'prevYear,prev,next,nextYear today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek' 
    },
    eventClick: function(info){
      openPopup(info);
    },
    events: [],
    selectable: true,
    eventDisplay: 'list-item',
    dateClick: function(info) {
      calendar.changeView('list', info.startStr);
    },
    select: function(info) {
      calendar.changeView('list', info.startStr);
    },
    unselectAuto: true
  });
  calendar.render();
  const querySnapshot =  await getDocs(collection(db, "calendar", "Khoa A","VjCSIDPcycO5oWGikPA11wtbwxL2"));
  querySnapshot.forEach((doc) => {
    time.push(doc.id);
  });
  var events;
  for (let i = 0; i < time.length; i++) {
    const docRef = doc(db, "calendar", "Khoa A","VjCSIDPcycO5oWGikPA11wtbwxL2",time[i]);
    const docSnap = await getDoc(docRef);
    var day = docSnap.data()["Appt"].toDate().toISOString();
    day = day.slice(0,16);
    var birth = docSnap.data()["Birth"].toDate().toISOString();
    birth = birth.slice(0,16); 
    //console.log(day);
    events = new event(day, docSnap.data()["Name"], docSnap.data()["Sex"], docSnap.data()["Sick"], birth);
    calendar.addEvent(events.getdata());
  }
});

function openPopup(info) {
  var ti = document.getElementById("title");
  ti.innerHTML = info.event.title;
  var popup = document.getElementById("popup");
  popup.style.display = "block";
  var birth = new Date(info.event.extendedProps.birth);
  var m = (birth.getMonth()+1 < 10) ? '0'+(birth.getMonth()+1).toString():(birth.getMonth()+1).toString();
  var d = (birth.getDate() < 10) ? '0'+(birth.getDate()).toString():(birth.getDate()).toString();
  var popupContent = document.getElementById("popup-content");
    popupContent.innerHTML =
      "<p>Giới tính: " +
      info.event.extendedProps.sex+
      "</p>" +
      "<p>Sinh nhật: " +
      d +'/'+m+'/'+ birth.getFullYear()+
      "</p>" +
      "<p>Triệu chứng: " +
      info.event.extendedProps.sick +
      "</p>";
}

window.onclick = function (event) {
  var popup = document.getElementById("popup");
  if (event.target == popup) {
    popup.style.display = "none";
  }
};
