// pages/matches.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery, gql } from '@apollo/client';
import UserModal from '@/components/UserModal';

interface MatchResult {
  emails: string[];
  cosine_weighted: number[][];
}

const GET_USER = gql`
  query GetUser($email: String!) {
    getUser(email: $email) { id name }
  }
`;

const POLL_INTERVAL = 5000; // ms

// ========== MatchListItem ==========
const MatchListItem: React.FC<{
  email: string;
  score: number;
  onView: (email: string) => void;
}> = ({ email, score, onView }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { email },
    fetchPolicy: 'cache-first',
  });

  let displayName = email;
  if (loading) displayName = 'Loading…';
  else if (!loading && !error && data?.getUser)
    displayName = data.getUser.name;

  return (
    <li className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
      <div>
        <p className="text-xl font-semibold">{displayName}</p>
        <p className="text-gray-600">
          Compatibility: {Math.round(score * 100)}%
        </p>
      </div>
      <button
        onClick={() => onView(email)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        View Profile
      </button>
    </li>
  );
};

// ========== MatchesPage ==========
const MatchesPage: React.FC = () => {
  // ⬇️ 1) All hooks up top, before any return
  const { user, isLoaded } = useUser();
  const [data, setData] = useState<MatchResult | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [polling, setPolling] = useState(false);
  const [modalEmail, setModalEmail] = useState<string | null>(null);

  const fetchMatches = useCallback(async () => {
    try {
      const res = await fetch('/api/matches');
      if (res.status === 200) {
        const json: MatchResult = await res.json();
        setData(json);
        setLoadingInitial(false);
        setPolling(false);
      } else if (res.status === 202) {
        setLoadingInitial(false);
        setPolling(true);
        setTimeout(fetchMatches, POLL_INTERVAL);
      } else {
        console.error('Unexpected status', res.status);
        setLoadingInitial(false);
      }
    } catch (err) {
      console.error('Failed to fetch matches', err);
      setLoadingInitial(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  // ⬇️ 2) Now it’s safe to do your early returns:
  if (!isLoaded) {
    return <div className="p-8">Loading your session…</div>;
  }
  if (!user || !user.primaryEmailAddress) {
    return <div className="p-8">Please sign in to see your matches.</div>;
  }
  const email = user.primaryEmailAddress.emailAddress;

  if (loadingInitial) {
    return <div className="p-8">Loading your matches…</div>;
  }
  if (polling || !data || !data.emails.includes(email)) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Matches Calculating…</h2>
        <p>This may take a couple of minutes. Check back soon!</p>
      </div>
    );
  }

  // ⬇️ 3) Final render once we have data
  const idx = data.emails.indexOf(email);
  const row = data.cosine_weighted[idx];
  const matches = data.emails
    .map((e, j) => ({ email: e, score: row[j] }))
    .filter((m) => m.email !== email)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <div className="relative min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Your Top Matches</h1>
        <ul className="space-y-4">
          {matches.map((m) => (
            <MatchListItem
              key={m.email}
              email={m.email}
              score={m.score}
              onView={(e) => setModalEmail(e)}
            />
          ))}
        </ul>
      </div>

      {modalEmail && (
        <UserModal email={modalEmail} onClose={() => setModalEmail(null)} />
      )}
    </div>
  );
};

export default MatchesPage;
