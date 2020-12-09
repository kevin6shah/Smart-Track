import firebase from 'firebase'
require("firebase/firestore");

function initializeFirebase() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
    apiKey: "AIzaSyBbg-3-MdPoJEqIYsy7oPY-ygiG_nbEFDQ",
    authDomain: "smart-track-d9d47.firebaseapp.com",
    databaseURL: "https://smart-track-d9d47.firebaseio.com",
    projectId: "smart-track-d9d47",
    storageBucket: "smart-track-d9d47.appspot.com",
    messagingSenderId: "1037701953092",
    appId: "1:1037701953092:web:221a8548a2dcfd13186e11",
    measurementId: "G-Q7JZX1QQ9V"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

function fetchData() {
    let templates = {}

    firebase.firestore().collection("templates").get().then(function(querySnapshot) {
        querySnapshot.forEach(function (doc) {
            templates[[doc.id]] = doc.data()
        });

        chrome.storage.sync.set({ templates: templates })
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('fetchData', { periodInMinutes: 180 });
    initializeFirebase()
    fetchData()
})

chrome.runtime.onStartup.addListener(() => {
    fetchData()
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm && alarm.name === 'fetchData') {
        fetchData()
    } else {
        chrome.alarms.create('fetchData', { periodInMinutes: 180 });
    }
});

