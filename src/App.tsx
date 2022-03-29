import { useState, useEffect } from 'react'
import './App.css'

import { Logo, ListPokemons, PokemonCard, InputSearch } from './styles'

import ModalP from './Components/Modal'

declare var window: any;
declare var document: any;
declare var newArry: any;
declare var old: any;

function getImagePokemon(url: string) {
  const id = url.split(`pokemon/`)[1].replace(`/`, ``)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

function App() {
  const [selectPokemon, SetSelectPokemon] = useState({url: "", name: "", moreData: {types: [{type: {name: ''}, stats: {base_stat: ``, stat:{name: ``}}}]}})
  const [pokemonsData, setPokemonsData] = useState<any[]>([])
  const [loadingApi, setApiLoading] = useState(false)
  const [loadMorePokemons, setLoadMorePokemons] = useState(false)

  useEffect(() => {
    const localStorage = window.localStorage.getItem(`pokedex`)
    if(!localStorage){
      window.localStorage.setItem(`pokedex`, JSON.stringify([]))
    }
    document.addEventListener('scroll', () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        if(!loadMorePokemons){
          setLoadMorePokemons(true)
          window[`page`] = window[`page`] + 1
          StartLoadingApi()
          window.scrollTo(0, window.innerHeight)
          document.querySelector(`body`)?.classList.add(`loading`)
        }
      }
    })
  })

  const SearchPokemonAPI = async () => {
    //Use FETCH for get pokemon search name or id
    setTimeout(async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${document.querySelector(`#searchPokemon`)?.value}`)
      if(typeof response == `object`){
        let data = await response.json()
        const moreData = {...data}
        data[`url`] = `https://pokeapi.co/api/v2/pokemon/${data?.id}/`
        data[`moreData`] = moreData
        if(typeof data.results == `undefined`){
          SetSelectPokemon(data)
          //Reset input
          document.querySelector(`#searchPokemon`).value = ``
        }
      }
    }, 300)
  }
  
  const StartLoadingApi = async () => { 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${36 * (window[`page`] + 1)}&offset=${36 * (window[`page`])}`)
    const json = await response.json()
    const moreData = {...json}
    json.results.map((pokemon: any, index: number) => {
      //Fetch from url the pokemon data typeScript
      fetch(pokemon.url).then(response => response.json()).then(data => {
        moreData.results[index][`moreData`] = data
      })
    })
    setTimeout(() => {
      newArry = []
      if(window[`page`] !== 0){
        moreData.results.map((pokemon: any) => {
          //Add in array newArry pokemon
          newArry.push(pokemon)
        })
        setApiLoading(true)
        const old = [] as  any;
        setPokemonsData(old => [...old, ...newArry])
        setLoadMorePokemons(false)
        document.querySelector(`body`)?.classList.remove(`loading`)
      } else{
        setPokemonsData(moreData.results)
      }
    }, 1000)
  }

  if(!loadingApi){
    StartLoadingApi();
    setApiLoading(true) 
  }

  return (
    <div className="App">
      <img src={`./images/back.jpg`}
      style={{
        position: `fixed`,
        top: `0px`,
        left: `0px`,
        width: `100%`,
        height: `100%`,
        transform: `scale(1.1)`,
        opacity: `0.2`,
        userSelect: `none`,
        objectFit: `cover`
      }}
      />
      <div className='noImage'/>
      <Logo src={`./images/pokemon.png`}/>
      <InputSearch 
      onKeyUp={() => {
        SearchPokemonAPI()
      }}
      id={`searchPokemon`}
      placeholder='Pesquise Pokémon por nome ou por id'/>
      { selectPokemon && selectPokemon.moreData.types[0].type.name !== `` && (
        <ModalP 
        SetSelectPokemon={SetSelectPokemon}
        selectPokemon={selectPokemon}
        getImagePokemon={getImagePokemon}
        />
      ) }
      {JSON.parse(window.localStorage.getItem(`pokedex`)) &&
         <h1 style={{
          left: `9%`,
          position: `relative`
        }}>Pokémon's favoritados</h1>
      }
      { JSON.parse(window.localStorage.getItem(`pokedex`)) && (
        <h1 style={{
          left: `9%`,
          position: `relative`,
          fontSize: `1.5em`
        }}>{ JSON.parse(window.localStorage.getItem(`pokedex`)).length == 0 ? `Nenhum Pokémon Favoritados`: `` } </h1>
      ) }
      <ListPokemons>
        {JSON.parse(window.localStorage.getItem(`pokedex`)) && JSON.parse(window.localStorage.getItem(`pokedex`)).map((pokemon: any, index: number) => (
          <div key={index}>
          { pokemon.moreData && (
              <PokemonCard 
              onClick={() => {
                SetSelectPokemon(pokemon)
              }}
              className={`${pokemon.moreData.types[0].type.name}`}>
              <img className='type' src={`./images/types/${pokemon.moreData.types[0].type.name}.png`}/>
              <img className='pokeBola' src={`./images/icon-logo-pokemon2.png`}/>
              <img className='spritePokemon' src={getImagePokemon(pokemon?.url)} alt={pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}/>
              <h2>
                {pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}
              </h2>
            </PokemonCard>
            )}
          </div>
        ))}
      </ListPokemons>

      <h1 style={{
        left: `9%`,
        position: `relative`
      }}>Pokémon's</h1>
      <ListPokemons>
        { loadingApi && pokemonsData && pokemonsData.map((pokemon: any, index: number) => (
          <div key={index}>
            { pokemon.moreData && (
              <PokemonCard 
              onClick={() => {
                SetSelectPokemon(pokemon)
              }}
              className={`${pokemon.moreData.types[0].type.name}`}>
              <img className='type' src={`./images/types/${pokemon.moreData.types[0].type.name}.png`}/>
              <img className='pokeBola' src={`./images/icon-logo-pokemon2.png`}/>
              <img className='spritePokemon' src={getImagePokemon(pokemon?.url)} alt={pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}/>
              <h2>
                {pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}
              </h2>
            </PokemonCard>
            )}
          </div>
        ))}
      </ListPokemons>
      { loadMorePokemons && (<>
        <br/><br/>
        <h1 style={{
          left: `9%`,
          position: `relative`
        }}>Loading...</h1>
        <br/><br/>
        <br/><br/>
        </> )}
    </div>
  )
}

export default App
