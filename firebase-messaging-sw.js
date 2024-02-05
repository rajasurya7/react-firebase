importScripts('https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyDzHLijXk_T94nbNs5uVr32fGL6mQXBAtE",
    authDomain: "testing-da9ca.firebaseapp.com",
    projectId: "testing-da9ca",
    storageBucket: "testing-da9ca.appspot.com",
    messagingSenderId: "909330493563",
    appId: "1:909330493563:web:6ef3a9f4ac15eec622b2de",
    measurementId: "G-PMQPME67B9",
};

firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: notificationTitle,
    icon: '<>'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});