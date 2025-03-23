import React from "react";

export default function CharacterList({ characters, onSelect }) {
  return (
    <ul>
      {characters.map(c => (
        <li key={c._id} onClick={() => onSelect(c)}>
          {c.name}
        </li>
      ))}
    </ul>
  );
}
