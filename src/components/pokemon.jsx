import React from 'react'

export const pokemonAttributes = ({ name, height, weight, abilities, types, species, base_experience }) => {
    return (
      <table>
        <tr key = {pokemonData.id}>
          <td><strong>{name}</strong></td>
          <td>Height: {height}</td>
          <td>Weight: {weight}</td>
          <td>Experience: {experience}</td>
          <td>Species: {species}</td>
          <td>Type: {types}</td>
          <td>Abilities: {abilities}</td>
        </tr>
      </table>
    )
}