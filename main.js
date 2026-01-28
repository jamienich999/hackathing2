
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  fetchSignInMethodsForEmail,
  linkWithCredential,
  EmailAuthProvider
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
const provider = new GoogleAuthProvider();

const status = document.getElementById("status");

const logoutBtn = document.getElementById("logout");
const resetBtn = document.getElementById("resetPassword")


// --- Google sign in ---
document.getElementById("googleLogin").onclick = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    status.textContent = err.message;
  }
};

document.getElementById("emailLogin").onclick = async () => {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  status.textContent = "Working...";

  try {
    // Attempt sign-in
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {

    if (err.code === "auth/user-not-found") {
      // Create account
      await createUserWithEmailAndPassword(auth, email, password);
      status.textContent = "Account created!";
    }

    else if (
      err.code === "auth/wrong-password" ||
      err.code === "auth/invalid-login-credentials"
    ) {
      // Check if this email exists under Google
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.includes("google.com")) {
        status.textContent =
          "Account exists with Google. Sign in with Google to link password.";

        const googleResult = await signInWithPopup(auth, provider);

        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(googleResult.user, credential);

        status.textContent = "✅ Password linked to Google account!";
      } else {
        status.textContent = "❌ Incorrect password.";
      }
    }

    else {
      status.textContent = err.code;
    }
  }
};

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    status.textContent = "Not signed in";
    logoutBtn.style.display = "none";
    resetBtn.style.display = "none";
    return;
  }

  await user.reload();

  const email = user.email?.toLowerCase().trim();

  if (!email || !email.endsWith("@dartmouth.edu")) {
    status.textContent = "❌ Must sign in with a Dartmouth account";
    await signOut(auth);
    return;
  }

  status.textContent = `✅ Access granted: ${email}`;
  logoutBtn.style.display = "inline";
  resetBtn.style.display = "inline";
});

logoutBtn.onclick = async () => {
  await signOut(auth);
  status.textContent = "Logged out";
};

document.getElementById("resetPassword").onclick = async () => {
  const email = document.getElementById("email").value.trim().toLowerCase();

  if (!email) {
    status.textContent = "Enter your email first";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    status.textContent =
      "📧 Password reset email sent. Use the link to set a password.";
  } catch (err) {
    status.textContent = err.message;
  }
};
