import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3P8czqert8XqgDVfafVASfUNf98SPg5s",
  authDomain: "hackathing2-986c5.firebaseapp.com",
  projectId: "hackathing2-986c5",
  storageBucket: "hackathing2-986c5.firebasestorage.app",
  messagingSenderId: "399823176205",
  appId: "1:399823176205:web:bb4baf0ed16c7008be8b44",
  measurementId: "G-WRCE3RK8DC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userEmailElement = document.getElementById("userEmail");
const status = document.getElementById("status");
const logoutBtn = document.getElementById("logout");

// Check authentication status
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Not signed in, redirect to login page
    window.location.href = "index.html";
    return;
  }

  await user.reload();
  const email = user.email?.toLowerCase().trim();

  // Verify Dartmouth email
  if (!email || !email.endsWith("@dartmouth.edu")) {
    status.textContent = "❌ Invalid account. Redirecting to login...";
    await signOut(auth);
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
    return;
  }

  // Display user email
  userEmailElement.textContent = email;
});

// Logout functionality
logoutBtn.onclick = async () => {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (err) {
    status.textContent = `Error: ${err.message}`;
  }
};
