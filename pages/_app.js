import { ProductsContextProvider } from "@/components/ProductContext";
import "@/styles/globals.css";

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

export default function App({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
      <Component {...pageProps} />
    </ProductsContextProvider>
  );
}

// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAxTKTuhYq3HSaOGXilze1Pm1cK0nurIpU",

  authDomain: "nextecomm-e2194.firebaseapp.com",

  projectId: "nextecomm-e2194",

  storageBucket: "nextecomm-e2194.appspot.com",

  messagingSenderId: "311483214863",

  appId: "1:311483214863:web:2c2cf8e5335f1a3f9f477a",

  measurementId: "G-0HQ5M7FB7B",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
