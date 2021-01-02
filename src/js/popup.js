import '../css/popup.css'
import React from "react";
import Router from "./popup/Router"
import { render } from "react-dom";
import "../img/icon-16.png";
import "../img/icon-38.png";
import "../img/icon-128.png";
import firebase from 'firebase'
require('firebase/auth')

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

initializeFirebase()

chrome.storage.sync.get("scrapedData", function (data) {
  // https://www.bu.edu/bedac/files/2015/10/Photo-placeholder.jpg
  let initData = {
    'price': "Not Available",
    'title': "Not Available",
    'img': "",
  }

  if (data.scrapedData !== undefined) {
    if (data.scrapedData.price !== '') {
      initData['price'] = data.scrapedData.price
    }
    if (data.scrapedData.title !== '') {
      initData['title'] = data.scrapedData.title
    }
    if (data.scrapedData.img !== '') {
      initData['img'] = data.scrapedData.img
    }
    initData['url'] = data.scrapedData.url
  }
  
  render(
    <Router scrapedData={initData}/>,
    window.document.getElementById("app-container")
  );
});