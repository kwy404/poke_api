import { Modal } from '../styles'

declare var window: any;
declare var document: any;
declare var pokemon: any;
var newArry: any[] = [];
declare var old: any;

const ModalP = (props: any) => {
  return (
    <>
      <Modal>
        <div className='modal-content'>
          {/* Pokemon select in Modal */}
          <div 
          onClick={() => {
            props.SetSelectPokemon({url: "", name: "", moreData: {types: [{type: {name: ''}, stats: {base_stat: ``, stat:{name: ``}}}]}})
          }}
          className='close'><i className="fa-solid fa-xmark"></i></div>
          <div 
          onClick={() => {
            const localStorage = window.localStorage.getItem(`pokedex`)
            let parsedLocalStorage = JSON.parse(localStorage)
            if(localStorage){
              const pokemonFind = parsedLocalStorage.find((pokemon: any) => pokemon.name === props.selectPokemon.name)
              if(!pokemonFind){
                parsedLocalStorage = [...parsedLocalStorage, props.selectPokemon]
                window.localStorage.setItem(`pokedex`, JSON.stringify(parsedLocalStorage))
              } else{
                //Remove pokemon from localStorage
                parsedLocalStorage = parsedLocalStorage.filter((pokemon: any) => pokemon.name !== props.selectPokemon.name)
                window.localStorage.setItem(`pokedex`, JSON.stringify(parsedLocalStorage))
              }
            } else{
              window.localStorage.setItem(`pokedex`, JSON.stringify([props.selectPokemon]))
            }
            const oldSetPokemon = props.selectPokemon
            props.SetSelectPokemon({url: "", name: "", moreData: {types: [{type: {name: ''}, stats: {base_stat: ``, stat:{name: ``}}}]}})
            setTimeout(() => {
              props.SetSelectPokemon(oldSetPokemon)
            }, 20)
          }}
          className='love'><i 
          style={{
            color: `${JSON.parse(window.localStorage.getItem(`pokedex`)) && JSON.parse(window.localStorage.getItem(`pokedex`)).find((pokemon: any) => pokemon.name === props.selectPokemon.name) ? '#cd3d3d' : 'white'}`
          }}
          className="fa-solid fa-heart"></i></div>
          <div className={`contentPokemon ${props.selectPokemon.moreData.types[0].type.name}`}>
            <h2>
                {props.selectPokemon?.name.charAt(0).toUpperCase() + props.selectPokemon?.name.slice(1)}
            </h2>
            <p>
              #000{props.selectPokemon?.url.split(`pokemon/`)[1].replace(`/`, ``)}
            </p>
            
            <img className='pokeBola' src={`./images/icon-logo-pokemon2.png`}/>
            <img className='spritePokemon' src={props.getImagePokemon(props.selectPokemon?.url)} alt={props.selectPokemon?.name.charAt(0).toUpperCase() + props.selectPokemon?.name.slice(1)}/>
          </div>
          <div className='bottom'>
            <div className='stats'>
              { props.selectPokemon.moreData.stats.map((stats: any, index: number) => (  
                <div className={`stats-item`} key={index}>
                  <h1>{stats.stat.name.toUpperCase()}</h1>
                  <h2>{stats.base_stat}</h2>
                  <div className='progress'>
                    <div 
                    style={{
                      width: `${stats.base_stat}%`
                    }}
                    className={`subprogress ${props.selectPokemon.moreData.types[0].type.name}`}></div>
                  </div>
                </div>
              ))}
              </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalP