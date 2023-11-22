import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import './index.css';
import App from './App';
import ScrollToTop from './components/ScrollToTop';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbf_qOLaMVM0KV0nywVcEb0o8Bbvfi54s",
  authDomain: "travelmuse-87f7f.firebaseapp.com",
  projectId: "travelmuse-87f7f",
  storageBucket: "travelmuse-87f7f.appspot.com",
  messagingSenderId: "308617674636",
  appId: "1:308617674636:web:85e672248f8cf5d2eba0a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);

