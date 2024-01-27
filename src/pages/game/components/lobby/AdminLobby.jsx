import React from 'react';


export const AdminLobby = ({ players, kickear, exitLobby }) => {
    return (
        <div>
            <ul>
                {players?.map(player => (
                    <li key={player.name} >
                        <span>{player.name}   </span>
                        <a href='#' onClick={() => kickear(player.id)}>kick</a>
                    </li>
                ))}
            </ul>
            <button onClick={exitLobby}>Start Game</button>

        </div>
    );
};
