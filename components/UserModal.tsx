// components/UserModal.tsx
"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import { CircleUserRound } from "lucide-react";

interface Props {
  email: string;
  onClose: () => void;
}

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

const UserModal: React.FC<Props> = ({ email, onClose }) => {
  const { data, loading, error } = useQuery<{ getUser: UserData }>(GET_USER, {
    variables: { email },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md">
        <div className="bg-white rounded-lg p-6 w-80 text-center">
          Loading…
        </div>
      </div>
    );
  }
  if (error || !data?.getUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-md">
        <div className="bg-white rounded-lg p-6 w-80 text-center">
          Error loading profile
        </div>
      </div>
    );
  }

  const u = data.getUser;

  return (
    <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative w-24 h-24">
            <div className="w-full h-full flex items-center justify-center rounded-full bg-gray-200">
              <CircleUserRound size={64} className="text-gray-500" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{u.name}</h2>
            <p className="text-gray-600">{u.year}</p>
            <p className="text-gray-600">{u.residentialCollege}</p>
            <p className="text-gray-600">{u.livingType}</p>
          </div>
        </div>

        {/* About Me */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800">About Me</h3>
          <p className="mt-2 text-gray-700">{u.bio}</p>
        </div>

        {/* Info Boxes */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border rounded-md bg-gray-50">
            <h4 className="font-semibold text-gray-800">Phone Number</h4>
            <p className="mt-1 text-gray-600">{u.phoneNumber}</p>
          </div>
          <div className="p-4 border rounded-md bg-gray-50">
            <h4 className="font-semibold text-gray-800">Email</h4>
            <p className="mt-1 text-gray-600">{u.email}</p>
          </div>
          <div className="p-4 border rounded-md bg-gray-50">
            <h4 className="font-semibold text-gray-800">Roommate Status</h4>
            <p className="mt-1 text-gray-600">{u.roommateStatus}</p>
          </div>
          <div className="p-4 border rounded-md bg-gray-50">
            <h4 className="font-semibold text-gray-800">Major</h4>
            <p className="mt-1 text-gray-600">{u.major}</p>
          </div>
          <div className="p-4 border rounded-md bg-gray-50">
            <h4 className="font-semibold text-gray-800">Looking For</h4>
            <ul className="mt-1 text-gray-600 list-disc list-inside">
              {u.lookingFor.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 border rounded-md bg-gray-50">
            <h4 className="font-semibold text-gray-800">Bringing Items</h4>
            <ul className="mt-1 text-gray-600 list-disc list-inside">
              {u.bringingItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
