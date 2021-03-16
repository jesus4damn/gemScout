import firebase from 'firebase/app';
import 'firebase/messaging';


const initializedFirebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDHG7I6j-qx2W3bV_rqvkuDiDctAGa7u4o",
  authDomain: "gemscout-8ffaf.firebaseapp.com",
  projectId: "gemscout-8ffaf",
  storageBucket: "gemscout-8ffaf.appspot.com",
  messagingSenderId: "219532763817",
  appId: "1:219532763817:web:0dbaffac57bab677a33fb8",
  measurementId: "G-9WH7X068JL",
});
let messaging : any = null;
if(firebase.messaging.isSupported()){
  messaging = initializedFirebaseApp.messaging();
}
// const messaging = initializedFirebaseApp.messaging();
// messaging.usePublicVapidKey(
// 	// Project Settings => Cloud Messaging => Web Push certificates
//   "BD6n7ebJqtOxaBS8M7xtBwSxgeZwX1gdS...6HkTM-cpLm8007IAzz...QoIajea2WnP8rP-ytiqlsj4AcNNeQcbes"
// );
export { messaging };