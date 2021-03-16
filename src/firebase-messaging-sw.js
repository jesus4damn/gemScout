importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyDHG7I6j-qx2W3bV_rqvkuDiDctAGa7u4o",
  authDomain: "gemscout-8ffaf.firebaseapp.com",
  projectId: "gemscout-8ffaf",
  storageBucket: "gemscout-8ffaf.appspot.com",
  messagingSenderId: "219532763817",
  appId: "1:219532763817:web:0dbaffac57bab677a33fb8",
  measurementId: "G-9WH7X068JL",
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});