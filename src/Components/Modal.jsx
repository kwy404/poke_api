import { Modal } from '../styles'

const ModalP = (props) => {
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
              { props.selectPokemon.moreData.stats.map((stats, index) => (  
                <div className={`stats-item`} key={index}>
                  <h1>{stats.stat.name.toUpperCase()}</h1>
                  <h2>{stats.base_stat}</h2>
                  <div className='progress'>
                    <div 
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