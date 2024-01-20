import React from 'react'

export const Lobby = (data) => {
  return (
    <ul>      
        {
            data?.map((player, colIndex) => (
                <li  key={colIndex} >
                    {player} 
                </li> 
            ))
        }
    </ul>  
  )
}
