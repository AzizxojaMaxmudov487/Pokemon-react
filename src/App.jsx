import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [showPok, setShowPok] = useState('true')
  const [pokName, setPokName] = useState('')
  const [pokemon, setPokemon] = useState({
    name: '',
    species: '',
    img: '',
    attack: '',
    defense: '',
    type: ''
  })

  const fecthPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokName}`)
      .then(response => {
        setPokemon({
          name: pokName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name
        })
        console.log(response);
        if(pokName.length === 0){
          setShowPok(true)
        }
        setShowPok(false)
      })
      .catch(() => {
        console.error('Xatolik');
      })
  }

  return (
    <>
      <h1 className='themeText'>Pokemon App</h1>
      <div className="searchArea">
        <input type="text"
          className='search'
          onChange={(e) => {
            setPokName(e.target.value)
          }}
        />
        <button onClick={fecthPokemon}>Search</button>
      </div>

      {showPok ?
        <h4 className='themeText2'>NO Content</h4> :
        <div className='resultCard'>
          <div className="card">
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} />
            <p>Species {pokemon.species}</p>
            <h3>Attack: {pokemon.attack}</h3>
            <h4> Defense: {pokemon.defense}</h4>
            <p> Type: {pokemon.type}</p>
          </div>
        </div>
      }

    </>
  )
}

export default App
