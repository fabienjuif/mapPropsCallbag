import React from 'react'

export default function List({ users = [], addUser }) {
  return (
    <div>
      <button onClick={addUser}>Add</button>
      <ul>
        {users.map(({ name }) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  )
}
