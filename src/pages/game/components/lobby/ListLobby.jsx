import React from 'react'

export const ListLobby = ({playerNames}) => {
    return (
        <ul>
            {playerNames.map(playerName => (
                <li key={playerName}>{playerName}</li>
            ))}
        </ul>
    )
}
