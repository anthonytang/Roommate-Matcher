import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// A simple modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    background: '#fff',
    padding: '20px',
    borderRadius: '4px',
    maxWidth: '500px',
    width: '100%',
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        {children}
        <button onClick={onClose} style={{ marginTop: '10px' }}>
          Close
        </button>
      </div>
    </div>
  );
};

const Games = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const supabase = createClientComponentClient();

  const openModal = () => {
    setIsModalOpen(true);
    // Fetch all players on modal open (optional)
    fetchPlayers();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Optionally clear search results or selected players when closing the modal
  };

  // Function to fetch players from Supabase using an ilike filter for searching by name
  const fetchPlayers = async (query = '') => {
    let queryBuilder = supabase.from('players').select('*');

    if (query) {
      queryBuilder = queryBuilder.ilike('name', `%${query}%`);
    }

    const { data, error } = await queryBuilder;

    if (error) {
      console.error('Error fetching players:', error);
    } else {
      setPlayers(data);
    }
  };

  // Handler for search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchPlayers(query);
  };

  // Add a player to the selected players list if not already added
  const handleAddPlayer = (player) => {
    if (!selectedPlayers.some((p) => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  // Optionally allow removal of a player from the selected list
  const handleRemovePlayer = (playerId) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== playerId));
  };

  return (
    <div>
      <h1>Games</h1>
      <button onClick={openModal}>Record Game</button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Record Game</h2>
        <input
          type="text"
          placeholder="Search players by name"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
        />
        <ul>
          {players.map((player) => (
            <li key={player.id} style={{ marginBottom: '5px' }}>
              {player.name}{' '}
              <button onClick={() => handleAddPlayer(player)}>Add</button>
            </li>
          ))}
        </ul>
        <h3>Selected Players:</h3>
        <ul>
          {selectedPlayers.map((player) => (
            <li key={player.id} style={{ marginBottom: '5px' }}>
              {player.name}{' '}
              <button onClick={() => handleRemovePlayer(player.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Games;
