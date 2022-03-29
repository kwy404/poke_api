
import styled from 'styled-components'

const InputSearch = styled.input`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 2.4em;
    width: 400px;
    outline: none;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0 20px;
    font-size: 16px;
    font-weight: bold;
    &:focus {
        border: 1px solid #00bcd4;
    }
    flex-direction: row;
    float: right;
    margin-right: 150px;
    margin-top: 100px;
`

const Logo = styled.img`
  width: 200px;
  object-fit: cover;
  margin: 2.4em;
  position: sticky;
  top: 0px;
  z-index: 20;
`

const ListPokemons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 2.4em;
`

const PokemonCardLoading = styled.div`
  width: 200px;
  height: 200px;
  margin: 0.8em;
  background-color: #f5f5f5;
  border-radius: 0.8em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: sticky;
  top: 0px;

  @keyframes loading {
    0%{
      background: #998f8f;
      opacity: 0.7;
    }
    100%{
      opacity: 1;
      background: #938f8f;
    }
  }
  animation: loading 1s infinite;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    color: #ffcb03;
    font-size: 2em;
    text-shadow: 0 0 1em #2a73b9;
    margin-top: 3em;
  }

  .pokeBola{
    width: 200px;
    height: 200px;
    position: absolute;
    transform: scale(0.5) translate(42%, -45%);
  }
`

const PokemonCard = styled.div`
  width: 200px;
  height: 200px;
  margin: 0.8em;
  border-radius: 0.8em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: sticky;
  filter: brightness(0.5);
  top: 0px;
  
  &:hover {
    filter: brightness(1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: drop-shadow(2px 4px 6px black)
  }

  h2 {
    color: #fff;
    font-size: 2em;
    text-shadow: 0 0 1em #2a73b9;
    margin-top: -0.3em;
    z-index: 4;
  }

  .spritePokemon{
    position: relative;
    z-index: 1;
    transition: 0.4s;
    filter: drop-shadow(2px 4px 6px black);
  }

  .pokeBola{
    width: 200px;
    height: 200px;
    position: absolute;
    transform: scale(0.5) translate(50%, -45%);
  }

  .type{
    width: 20%;
    margin-top: 150px;
    float: left;
    left: 0px;
    position: absolute;
    z-index: 2;
    height: 40px;
    filter: scale(0) drop-shadow(2px 4px 6px black);
  }
`

const Modal = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2em;
    overflow: auto;
    color: #fff;
    font-size: 1.5em;
    h1 {
      margin-bottom: 2em;
    }
    h2{
        margin: 1em;
        position: absolute;
    }
    p {
        margin: 1em;
        position: absolute;
        top: 1em;
        font-weight: bold;
        font-size: 0.7em;
        float: right;
        right: 0px;
    }
    .close {
      filter: drop-shadow(2px 4px 6px black);
      cursor: pointer;
      position: relative;
      top: -57%;
      z-index: 11;
      padding: 0.5em;
      width: 20px;
      height: 20px;
      right: -65%;
      background-color: #ccc;
      border-radius: 50%;
      color: #2a73b9;
      font-size: 1.5em;
      text-shadow: 0 0 1em #fff;
      &:hover {
        background-color: #ac2727;
        color: #fff;
        text-shadow: 0 0 1em #fff;
      }
      i{
        font-size: 0.7em;
        position: absolute;
        top: 20%;
        left: 30%;
      }
    }
    .modal-content {
      width: 400px;
      height: 700px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2em;
      background-color: #fff;
      border-radius: 0.8em;
      z-index: 11;
      top: 20px;
      position: relative;
      animation: openModal 0.4s;
      @keyframes openModal {
        0%{
              transform: scale(0.5);
        }
        100%{
            transform: scale(1);
        }
      }
      img {
        width: 100%;
        height: 100%;
      }

      .contentPokemon{
          width: 400px;
          height: 350px;
          position: absolute;
          top: 0px;
          display: flex;
          border-radius: 0.8em;
          img{
            object-fit: cover;
          }

          .pokeBola{
            width: 200px;
            height: 200px;
            position: absolute;
            transform: scale(0.95) translate(45%, -50%);
            top: 84%;
          }

          .spritePokemon{
            position: relative;
            z-index: 1;
            height: 365px;
            transition: 0.4s;
            width: 365px;
            filter: drop-shadow(2px 4px 6px black);
            transform: scale(0.5) translateY(45%);
            z-index: 10;
          }
      }
      .bottom{
          background: hsl(0deg 0% 15%);
          height: 400px;
          width: 100%;
          position: absolute;
          top: 320px;
          border-radius: 0.8em;
          z-index: 6;
      }
    }
`

//Exports
export { Logo, ListPokemons, PokemonCardLoading, PokemonCard, Modal, InputSearch }