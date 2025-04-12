import React from 'react'
import Link from 'next/link'

const MatchesPage = () => {
  // Sample data for prospective roommates with high compatibility scores
  const matches = [
    { id: 1, name: 'Alice Smith', compatibility: 92 },
    { id: 2, name: 'Bob Johnson', compatibility: 88 },
    { id: 3, name: 'Charlie Brown', compatibility: 95 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Your Matches</h1>
        <ul className="space-y-4">
          {matches.map((match) => (
            <li
              key={match.id}
              className="flex items-center justify-between p-4 border rounded-md bg-gray-50"
            >
              <div>
                <p className="text-xl font-semibold">{match.name}</p>
                <p className="text-gray-600">
                  Compatibility Score: {match.compatibility}%
                </p>
              </div>
              <Link
                href={`/dashb`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MatchesPage;







