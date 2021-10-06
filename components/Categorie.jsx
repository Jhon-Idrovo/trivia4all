import React from "react";

function Categorie({ name, handleClick }) {
  return (
    <button className="categorie" onClick={() => handleClick(name)}>
      <h3>{name}</h3>
    </button>
  );
}

export default Categorie;
