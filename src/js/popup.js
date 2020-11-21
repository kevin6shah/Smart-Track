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
  apiKey: "AIzaSyCUdhfQfwdNM_DHp25cQseUTc7bYW6VZL4",
  authDomain: "price-tracker-38259.firebaseapp.com",
  databaseURL: "https://price-tracker-38259.firebaseio.com",
  projectId: "price-tracker-38259",
  storageBucket: "price-tracker-38259.appspot.com",
  messagingSenderId: "692558323406",
  appId: "1:692558323406:web:72b1658278edeba5b8ba9f",
  measurementId: "G-SWMGTV2B5B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

chrome.storage.local.get("scrapedData", function (data) {
  const initData = {
    image: 'https://www.bu.edu/bedac/files/2015/10/Photo-placeholder.jpg',
    body: "Not Available",
    price: "Not Available"
  }
  render(
    <Router scrapedData={data.scrapedData !== null ? data.scrapedData : initData}/>,
    window.document.getElementById("app-container")
  );
});