import React from 'react'
import { ListLobby } from './ListLobby';
import { AdminLobby } from './AdminLobby';

export const Lobby = ({ players, admin, exitLobby, kickear }) => {
  const playerNames = players?.map(player => player.name);
  if (!admin) return <ListLobby playerNames={playerNames} />

  return (
    <div>
      <AdminLobby players={players} kickear={kickear} exitLobby={exitLobby} />
    </div>
  )
}
