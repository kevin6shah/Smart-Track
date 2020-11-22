import "../css/popup.css";
import React from "react";
import Router from "./popup/Router"
import { render } from "react-dom";
import "../img/icon-16.png";
import "../img/icon-38.png";
import "../img/icon-128.png";
import firebase from 'firebase'
require('firebase/auth')

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

chrome.storage.local.get("scrapedData", function (data) {
  let initData = {
    img: 'https://www.bu.edu/bedac/files/2015/10/Photo-placeholder.jpg',
    title: "Not Available",
    price: "Not Available",
    url: "Not Available"
  }
  try {
    if (data.scrapedData.price !== '') {
      initData = data.scrapedData
    }
  } catch (e) { }
  
  render(
    <Router scrapedData={initData}/>,
    window.document.getElementById("app-container")
  );
});