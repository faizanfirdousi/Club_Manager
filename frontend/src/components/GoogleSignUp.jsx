import React from "react";
import { useNavigate } from "react-router-dom";
import Google from "../assets/Google.png";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Add Firestore import
import { db } from "./firebase"; // Import Firestore database instance
import { toast } from "react-toastify";

function GoogleSignUp() {
  const navigate = useNavigate();

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Get user data from result
      console.log(result);

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        // Use navigate instead of window.location.href
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      toast.error("Login failed. Please try again.");
    }
  }

  return (
    <div className="mt-8">
      <button
        className="w-full flex items-center justify-center gap-3 px-6 py-4 
                 border border-gray-600 rounded-xl bg-gray-700 hover:bg-gray-600 
                 transition-all duration-200 cursor-pointer"
        onClick={googleLogin}
      >
        <img className="w-8 h-8" src={Google} alt="Google" />
        <span className="text-white font-medium">Continue with Google</span>
      </button>
    </div>
  );
}

export default GoogleSignUp;
