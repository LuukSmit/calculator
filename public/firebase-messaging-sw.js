importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "38870698063",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(({ data }) => {
    console.log('[firebase-messaging-sw.js] Received background message ');
    // Customize notification here
    const { title, message } = data;
    const options = { body: message };
  
    return self.registration.showNotification(title, options);
  });