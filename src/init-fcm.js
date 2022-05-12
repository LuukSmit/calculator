import * as firebase from 'firebase/app';
import 'firebase/messaging';

const initializedFirebaseApp = firebase.initializeApp({
  messagingSenderId: '38870698063',
});

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey('BCAbuxDCkP2I2y0HHFxLkWaGOjb88a6QSHG-CAk5Nir7SuH3S0Cr1wzt0dgWhwIbl78AZoGOJ5k6vNHpTM6eAGk');

export { messaging };
