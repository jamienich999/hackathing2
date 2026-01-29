import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  sendPasswordResetEmail
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
const resetBtn = document.getElementById("resetPassword")

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
    status.textContent = "❌ Invalid account. Redirecting...";
    await signOut(auth);
    setTimeout(() => window.location.href = "index.html", 1500);
    return;
  }

  if (!user.emailVerified && user.providerData[0]?.providerId === "password") {
    status.textContent = "📧 Please verify your email to access the dashboard.";
    await signOut(auth);
    setTimeout(() => window.location.href = "index.html", 2000);
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

// Detect providers
const providers = user.providerData.map(p => p.providerId);
const hasPassword = providers.includes("password");

// Update button text
resetBtn.textContent = hasPassword ? "Change password" : "Set password";

resetBtn.onclick = async () => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    status.textContent = "No authenticated user.";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, user.email);
    status.textContent =
      "📧 Password reset email sent to your account email.";
  } catch (err) {
    status.textContent = err.message;
  }
};

//Add reset password
//Add verification email