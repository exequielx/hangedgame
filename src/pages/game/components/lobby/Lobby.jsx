import React from 'react'
import { ListLobby } from './ListLobby';
import { AdminLobby } from './AdminLobby';

export const Lobby = ({ players, admin, exitLobby, kickear }) => {
  const playerNames = players?.map(player => player.name);
  console.log(players)
  if (!admin) return <ListLobby playerNames={playerNames} />

  return (
    <div>
      <AdminLobby players={players} kickear={kickear} exitLobby={exitLobby} />
      <button onClick={exitLobby}>Empezar a jugar</button>
    </div>
  )
}
