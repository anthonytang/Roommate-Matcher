"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { CircleUserRound } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { UPDATE_USER_INFO } from '../graphql/mutations';
import ItemListInput from '@/components/ItemListInput';

interface UserData {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  residentialCollege: string;
  gender: string;
  year: string;
  livingType: string;
  major: string;
  roommateStatus: string;
  lookingFor: string[];
  bringingItems: string[];
  bio: string;
  createdAt: string;
  updatedAt: string;
}

const AccountPage: React.FC = () => {
  // Get Clerk user info (e.g., email) from Clerk
  const { user, isLoaded } = useUser();

  // Local state for account data
  const [userData, setUserData] = useState<UserData | null>(null);
  // Local state for form data (used when editing/creating account info)
  const [formData, setFormData] = useState<UserData>({
    id: "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    name: "",
    phoneNumber: "",
    residentialCollege: "",
    gender: "",
    year: "",
    livingType: "",
    major: "",
    roommateStatus: "",
    lookingFor: [],
    bringingItems: [],
    bio: "",
    createdAt: "",
    updatedAt: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // New state for error messages on the form
  const [formError, setFormError] = useState<string | null>(null);

  // Query account info once Clerk user is loaded
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { email: user?.primaryEmailAddress?.emailAddress },
    skip: !isLoaded || !user?.primaryEmailAddress?.emailAddress,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data && data.getUser) {
      setUserData(data.getUser);
      // Also pre-fill the form with existing data
      setFormData(data.getUser);
    }
  }, [data]);

  // Mutation for updating (or upserting) account info
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);

  // Handler to open the edit modal
  const handleEditClick = () => {
    // If userData exists, pre-fill the form; otherwise use current formData
    setFormData(userData || formData);
    setIsModalOpen(true);
    setFormError(null); // Clear any existing errors
  };

  // Handler to close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Generic change handler for inputs and textareas
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for form submission: update or create user account info
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Check if the email in the form matches the signed-in user's email
    const signedInEmail = user?.primaryEmailAddress?.emailAddress || "";
    if (formData.email !== signedInEmail) {
      setFormError("Please use the email that you signed in with");
      return; // Stop submission since the email is invalid
    }
    
    try {
      const response = await updateUserInfo({
        variables: {
          email: formData.email,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          residentialCollege: formData.residentialCollege,
          gender: formData.gender,
          year: formData.year,
          livingType: formData.livingType,
          major: formData.major,
          roommateStatus: formData.roommateStatus,
          lookingFor: formData.lookingFor,
          bringingItems: formData.bringingItems,
          bio: formData.bio,
        },
      });
      // Update local state with the new data
      setUserData(response.data.updateUserInfo);
      setIsModalOpen(false);
      // Optionally, refetch the query to ensure consistency
      // refetch();
    } catch (err: any) {
      console.error("Error updating account info:", err);
      setFormError("An error occurred while updating your account info. Email or phone number might not be unique.");
    }
  };

  if (loading) return <div>Loading account information...</div>;
  if (error) {
    console.error("Error fetching account info:", error);
    return <div>Error loading account information.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        {userData ? (
          // If account data exists, display it
          <>
            {/* Profile Header */}
            <div className="flex items-center space-x-6">
              <div className="relative w-32 h-32">
                <div className="w-full h-full flex items-center justify-center rounded-full bg-gray-200">
                  <CircleUserRound size={64} className="text-gray-500" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                <p className="text-gray-600">{userData.year}</p>
                <p className="text-gray-600">{userData.residentialCollege}</p>
                <p className="text-gray-600">{userData.livingType}</p>
              </div>
            </div>
            {/* Bio Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
              <p className="mt-2 text-gray-700">{userData.bio}</p>
            </div>
            {/* Info Boxes */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Number */}
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-semibold text-gray-800">Phone Number</h3>
                <p className="mt-1 text-gray-600">{userData.phoneNumber}</p>
              </div>
              {/* Email */}
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="mt-1 text-gray-600">{userData.email}</p>
              </div>
              {/* Roommate Status */}
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-semibold text-gray-800">Roommate Status</h3>
                <p className="mt-1 text-gray-600">{userData.roommateStatus}</p>
              </div>
              {/* Major */}
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-semibold text-gray-800">Major</h3>
                <p className="mt-1 text-gray-600">{userData.major}</p>
              </div>
              {/* Looking For */}
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-semibold text-gray-800">Looking For</h3>
                <ul className="mt-1 text-gray-600 list-disc list-inside">
                  {userData.lookingFor.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              {/* Bringing Items */}
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-semibold text-gray-800">Bringing Items</h3>
                <ul className="mt-1 text-gray-600 list-disc list-inside">
                  {userData.bringingItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Floating Edit Button */}
            <button
              onClick={handleEditClick}
              className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
          </>
        ) : (
          // If no account info exists, show the account creation form
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Account Info</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Year</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Residential College</label>
                <input
                  type="text"
                  name="residentialCollege"
                  value={formData.residentialCollege}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Major</label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Living Type</label>
                <input
                  type="text"
                  name="livingType"
                  value={formData.livingType}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Roommate Status</label>
                <input
                  type="text"
                  name="roommateStatus"
                  value={formData.roommateStatus}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">About Me</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  rows={4}
                ></textarea>
              </div>
              <ItemListInput
                label="Looking For (Roommate Traits)"
                items={formData.lookingFor}
                onChange={(items) => setFormData((prev) => ({ ...prev, lookingFor: items }))}
              />
              <ItemListInput
                label="Bringing Items"
                items={formData.bringingItems}
                onChange={(items) => setFormData((prev) => ({ ...prev, bringingItems: items }))}
              />
              {/* Display error message if exists */}
              {formError && <p className="text-red-500 mt-2">{formError}</p>}
              <div className="flex justify-center space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Modal for editing account info */}
      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg relative">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              &#x2715;
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              {/* Additional fields can be rendered here as needed */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
