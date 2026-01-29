
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
  sendEmailVerification
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


// --- Google sign in ---
document.getElementById("googleLogin").onclick = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email?.toLowerCase().trim();

    if (!email || !email.endsWith("@dartmouth.edu")) {
      status.textContent = "❌ Must sign in with a Dartmouth account";
      await signOut(auth);
      return;
    }
    const providers = user.providerData.map(p => p.providerId);

    status.textContent = "✅ Signed in successfully!";

  } catch (err) {
    status.textContent = err.message;
  }
};

// --- Sign Up (Create new account) ---
document.getElementById("signUp").onclick = async () => {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  // Validate Dartmouth email before proceeding
  if (!email.endsWith("@dartmouth.edu")) {
    status.textContent = "❌ Must use a Dartmouth email (@dartmouth.edu)";
    return;
  }

  if (password.length < 6) {
    status.textContent = "❌ Password must be at least 6 characters.";
    return;
  }

  status.textContent = "Creating account...";

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(cred.user);

    status.textContent =
      "📧 Account created! Please verify your email before signing in.";

    await signOut(auth);
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      status.textContent = "❌ This email is already registered. Try 'Sign In' with your password, or 'Sign in with Google' if you used Google.";
    } else if (err.code === "auth/weak-password") {
      status.textContent = "❌ Password should be at least 6 characters.";
    } else {
      status.textContent = `❌ Error: ${err.message}`;
    }
  }
};

// --- Sign In (Existing account) ---
document.getElementById("signIn").onclick = async () => {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  // Validate Dartmouth email before proceeding
  if (!email.endsWith("@dartmouth.edu")) {
    status.textContent = "❌ Must use a Dartmouth email (@dartmouth.edu)";
    return;
  }

  status.textContent = "Signing in...";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    status.textContent = "✅ Signed in successfully!";
  } catch (err) {
    if (err.code === "auth/invalid-credential" || err.code === "auth/invalid-login-credentials") {
      status.textContent = "❌ Invalid email or password. If you signed up with Google, use 'Sign in with Google' button instead.";
    } else if (err.code === "auth/user-not-found") {
      status.textContent = "❌ No account found. Try 'Sign Up' or 'Sign in with Google' if you used Google.";
    } else if (err.code === "auth/wrong-password") {
      status.textContent = "❌ Incorrect password.";
    } else {
      status.textContent = `❌ Error: ${err.message}`;
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

  if (!user.emailVerified && user.providerData[0]?.providerId === "password") {
    status.textContent =
      "📧 Please verify your email before accessing the dashboard.";
    await signOut(auth);
    return;
  }

  const email = user.email?.toLowerCase().trim();

  if (!email || !email.endsWith("@dartmouth.edu")) {
    status.textContent = "❌ Must sign in with a Dartmouth account";
    await signOut(auth);
    return;
  }

  // Redirect to dashboard on successful login
  status.textContent = `✅ Access granted! Redirecting...`;
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 500);
});

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
