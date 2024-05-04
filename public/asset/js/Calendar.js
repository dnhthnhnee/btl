import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getAuth,  onAuthStateChanged, signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'
import {  getFirestore, doc, setDoc, deleteDoc, getDoc, getDocs, collection, writeBatch  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
import firebaseConfig from "./fconfig.mjs";
import { CurrentUser } from '../homepage/register.js';
import { Calendar as FullCalendar } from 'https://cdn.skypack.dev/@fullcalendar/core';
import dayGridPlugin from 'https://cdn.skypack.dev/@fullcalendar/daygrid';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

$(document).ready(function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar(calendarEl, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        events: [
            {
                title: 'Event 1',
                start: '2024-04-01'
            },
            {
                title: 'Event 2',
                start: '2022-12-05',
                end: '2022-12-08'
            },
            {
                title: 'Event 3',
                start: '2022-12-09T12:30:00',
                allDay: false // will make the time show
            }
            // other events here...
        ]
    });
    calendar.render();
});