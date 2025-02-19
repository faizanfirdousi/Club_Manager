import React, { useState, useEffect } from "react";
import { auth } from "../../components/firebase";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;

        if (!user) {
          throw new Error("No user logged in");
        }

        // Get the user's auth provider data
        const providerData = user.providerData[0];
        const isGoogleUser = providerData.providerId === "google.com";

        if (isGoogleUser) {
          setUserData({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            provider: "Google",
          });
        } else {
          // For email/password users, fetch additional data from your backend
          const token = await user.getIdToken();
          const response = await fetch(
            `http://localhost:3001/users/${user.uid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          const userData = await response.json();
          setUserData({
            ...userData,
            email: user.email,
            provider: "Email/Password",
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-6">
          {userData?.photoURL ? (
            <img
              src={userData.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center">
              <span className="text-3xl text-purple-700">
                {userData?.displayName?.[0] ||
                  userData?.email?.[0]?.toUpperCase()}
              </span>
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {userData?.displayName || "User"}
            </h1>
            <p className="text-gray-600">{userData?.email}</p>
            <p className="text-sm text-purple-600 mt-1">
              Signed in with {userData?.provider}
            </p>
          </div>
        </div>

        {userData?.provider === "Email/Password" && (
          <div className="mt-6 border-t pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <p className="mt-1 text-gray-900">
                  {userData?.firstName || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <p className="mt-1 text-gray-900">
                  {userData?.lastName || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Account Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Verified
              </label>
              <p className="mt-1 text-gray-900">
                {auth.currentUser?.emailVerified ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Created
              </label>
              <p className="mt-1 text-gray-900">
                {auth.currentUser?.metadata.creationTime
                  ? new Date(
                      auth.currentUser.metadata.creationTime
                    ).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
