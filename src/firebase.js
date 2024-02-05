import { initializeApp } from "firebase/app";
import { getMessaging, getToken as getMessagingToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDzHLijXk_T94nbNs5uVr32fGL6mQXBAtE",
  authDomain: "testing-da9ca.firebaseapp.com",
  projectId: "testing-da9ca",
  storageBucket: "testing-da9ca.appspot.com",
  messagingSenderId: "909330493563",
  appId: "1:909330493563:web:6ef3a9f4ac15eec622b2de",
  measurementId: "G-PMQPME67B9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getToken = (setTokenFound) => {
  return getMessagingToken(messaging, {vapidKey: 'BCTt8vlXaR5d5HhSSk5MJeCDxj-bNr9r2rHqTR7JEQXa83X6chfOFyFRKLJqOLI6O_0cE0rsafbTsxp0LCENWf4'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}
if ('serviceWorker' in navigator) {
	  navigator.serviceWorker.register(new URL('../firebase-messaging-sw.js', import.meta.url), {type: 'module'})
	  .then(function(response) {
	    // Service worker registration done
	    console.log('Registration Successful', response);
	  }, function(error) {
    // Service worker registration failed
	    console.log('Registration Failed', error);
  })
}
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
