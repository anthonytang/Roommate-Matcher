"use client";
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const ComparePlayers = () => {
  const supabase = createClientComponentClient();

  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchResults1, setSearchResults1] = useState([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState(null);

  const [searchQuery2, setSearchQuery2] = useState('');
  const [searchResults2, setSearchResults2] = useState([]);
  const [selectedPlayer2, setSelectedPlayer2] = useState(null);

  const fetchPlayers = async (query, setResults) => {
    let queryBuilder = supabase.from('players').select('*');
    if (query) {
      queryBuilder = queryBuilder.ilike('name', `%${query}%`);
    }
    const { data, error } = await queryBuilder;
    if (error) {
      console.error('Error fetching players:', error);
    } else {
      setResults(data);
    }
  };

  useEffect(() => {
    fetchPlayers(searchQuery1, setSearchResults1);
  }, [searchQuery1]);

  useEffect(() => {
    fetchPlayers(searchQuery2, setSearchResults2);
  }, [searchQuery2]);

  const handleSelectPlayer1 = (player) => {
    setSelectedPlayer1(player);
    setSearchQuery1(player.name);
    setSearchResults1([]);
  };

  const handleSelectPlayer2 = (player) => {
    setSelectedPlayer2(player);
    setSearchQuery2(player.name);
    setSearchResults2([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Compare Players</h1>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1 mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Player 1</h2>
          <input 
            type="text"
            placeholder="Search for player..."
            value={searchQuery1}
            onChange={(e) => {
              setSearchQuery1(e.target.value);
              setSelectedPlayer1(null);
            }}
            className="border p-2 w-full mb-2"
          />
          {searchResults1.length > 0 && !selectedPlayer1 && (
            <ul className="border p-2 max-h-60 overflow-y-auto mb-2">
              {searchResults1.map((player) => (
                <li 
                  key={player.id} 
                  onClick={() => handleSelectPlayer1(player)}
                  className="cursor-pointer hover:bg-gray-100 p-1"
                >
                  {player.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Player 2</h2>
          <input 
            type="text"
            placeholder="Search for player..."
            value={searchQuery2}
            onChange={(e) => {
              setSearchQuery2(e.target.value);
              setSelectedPlayer2(null);
            }}
            className="border p-2 w-full mb-2"
          />
          {searchResults2.length > 0 && !selectedPlayer2 && (
            <ul className="border p-2 max-h-60 overflow-y-auto mb-2">
              {searchResults2.map((player) => (
                <li 
                  key={player.id} 
                  onClick={() => handleSelectPlayer2(player)}
                  className="cursor-pointer hover:bg-gray-100 p-1"
                >
                  {player.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedPlayer1 && selectedPlayer2 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comparison</h2>
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Stat</th>
                <th className="p-2 border">{selectedPlayer1.name}</th>
                <th className="p-2 border">{selectedPlayer2.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Games Played</td>
                <td className="p-2 border">{selectedPlayer1.games_played}</td>
                <td className="p-2 border">{selectedPlayer2.games_played}</td>
              </tr>
              <tr>
                <td className="p-2 border">Win Percentage</td>
                <td className="p-2 border">{selectedPlayer1.win_percentage}</td>
                <td className="p-2 border">{selectedPlayer2.win_percentage}</td>
              </tr>
              <tr>
                <td className="p-2 border">Points per Game</td>
                <td className="p-2 border">{selectedPlayer1.points_per_game}</td>
                <td className="p-2 border">{selectedPlayer2.points_per_game}</td>
              </tr>
              <tr>
                <td className="p-2 border">Roads per Game</td>
                <td className="p-2 border">{selectedPlayer1.roads_per_game}</td>
                <td className="p-2 border">{selectedPlayer2.roads_per_game}</td>
              </tr>
              <tr>
                <td className="p-2 border">Settlements per Game</td>
                <td className="p-2 border">{selectedPlayer1.settlements_per_game}</td>
                <td className="p-2 border">{selectedPlayer2.settlements_per_game}</td>
              </tr>
              <tr>
                <td className="p-2 border">Cities per Game</td>
                <td className="p-2 border">{selectedPlayer1.cities_per_game}</td>
                <td className="p-2 border">{selectedPlayer2.cities_per_game}</td>
              </tr>
              <tr>
                <td className="p-2 border">Dev Cards per Game</td>
                <td className="p-2 border">{selectedPlayer1.dev_cards_per_game}</td>
                <td className="p-2 border">{selectedPlayer2.dev_cards_per_game}</td>
              </tr>
              <tr>
                <td className="p-2 border">Largest Army Count</td>
                <td className="p-2 border">{selectedPlayer1.largest_army_count}</td>
                <td className="p-2 border">{selectedPlayer2.largest_army_count}</td>
              </tr>
              <tr>
                <td className="p-2 border">Longest Road Count</td>
                <td className="p-2 border">{selectedPlayer1.longest_road_count}</td>
                <td className="p-2 border">{selectedPlayer2.longest_road_count}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparePlayers;
