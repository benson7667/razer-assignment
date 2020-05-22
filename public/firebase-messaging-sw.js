// eslint-disable-next-line
importScripts("https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js");
// eslint-disable-next-line
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js"
);
// import config from './config'

const app = firebase.initializeApp({
  apiKey: "AIzaSyDl0RYj6lmJA5MDSffXAlDFTCrpwbGNnYQ",
  authDomain: "razer-assignment.firebaseapp.com",
  databaseURL: "https://razer-assignment.firebaseio.com",
  projectId: "razer-assignment",
  storageBucket: "razer-assignment.appspot.com",
  messagingSenderId: "902639137180",
  appId: "1:902639137180:web:7f4ebd9369fb2244295859",
  measurementId: "G-XZVR7VMJRS",
  webPushCertificates:
    "BJ5aME5WQsBNHBw_g2grVzIChUIkgsOKo9wctdGc5c3tqZohF5ajhbuXhMrHfHaZ5KjrVtPaQTKFoqTmT2LN9cI",
});
const messaging = firebase.messaging(app);

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus)
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  let notificationTitle = "You have new order";
  let notificationOptions = {
    body: "XXXX send u an order",
    // icon: '/logo192.png'
  };

  // eslint-disable-next-line
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// eslint-disable-next-line
self.addEventListener("notificationclick", function (event) {
  console.log("u click the notification", event);
});
