import React from "react";
import { auth } from "../components/firebase";

function TestToken() {
  const getToken = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        console.log("Your Firebase Token:", token);
      } else {
        console.log("No user is signed in");
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Test Token Page</h1>
      <button
        onClick={getToken}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Token
      </button>
      <p className="mt-4">
        After clicking the button, check your browser console (F12) to see your
        token
      </p>
    </div>
  );
}

export default TestToken;
