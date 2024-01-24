import React from 'react';


export const AdminLobby = ({ players, kickear, exitLobby }) => {
    console.log(players);
    return (
        <div>
            <ul>
                {players?.map(player => (
                    <li key={player.name}>
                        <span>{player.name}</span>
                        <button onClick={() => kickear(player.id)}>Kick</button>
                    </li>
                ))}
            </ul>
            <button onClick={exitLobby}>Empezar a jugar</button>

        </div>
    );
};
