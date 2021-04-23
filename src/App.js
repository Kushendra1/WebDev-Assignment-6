import { Component } from "react";
import axios from "axios";
import "./App.css";

class SearchAPI extends Component{
  constructor(props){
    super(props);
    this.state={
      apiData: [],
      pokemon: "",
      found: false,
        error:""
    }
  }

  handleChange = (event) => {
      this.setState({pokemon: event.target.value});
  }

  handleSearchClick = async () => {
      this.state.apiData=[];
    if(this.state.error!=="") {
        var lastElement = document.getElementById('P');
        document.getElementById("results").removeChild(lastElement)
        this.state.error="";
    }
    let pokemonName = this.state.pokemon.toLowerCase();
    let linkToAPI = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName;

    try{
      let response = await axios.get(linkToAPI);
      console.log(response.data);
      this.setState({apiData: response.data, found: true});
    }
    catch (err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        this.setState({found: false});
          this.setState({error: err.response.data});

          var para = document.createElement('P');
          para.id = 'P'
          para.innerHTML = 'Ooooppps ... character "' + this.state.pokemon + '" does not exist yet. Try sending it as ' +
              'a recommendation to the pokemon creators!';
          return document.getElementById("results").appendChild(para);
      }
    }
  }

  generateData = () =>{
    let pokemonData = this.state.apiData;
    let foundResults = this.state.found;
    let typesData = [pokemonData.types];
    console.log(typesData);
    let table = [];

    if(!foundResults){
      <p>No results.</p>
    }
    else{
      let name = pokemonData.name;
      let height = pokemonData.height;
      let weight = pokemonData.weight;
      let experience = pokemonData.base_experience;
      let species = pokemonData.species.name;
      let sprites = pokemonData.sprites.other.dream_world.front_default;
      console.log(sprites);
      let abilities = [];
      let type = [];
      if(pokemonData.types.length > 1){
        for(let i = 0; i < pokemonData.types.length; i++){
          let typeFill = pokemonData.types[i].type.name;
          type.push(
            typeFill
          )
          type.push(
            " "
          )
        }
      }
      else{
        let typeFill = pokemonData.types[0].type.name;
        type.push(
          typeFill
        )
      }
      
      if(pokemonData.abilities.length > 1){
        for (let i = 0; i < pokemonData.abilities.length; i++){
          let abilitiesFill = pokemonData.abilities[i].ability.name;
          abilities.push(
            abilitiesFill
          )
          abilities.push(
            " "
          )
        }
      }
      else{
        let abilitiesFill = pokemonData.abilities[0].ability.name;
        abilities.push(
          abilitiesFill
        )
      }
      

      table.push(
        <tr key = {pokemonData.id}>
          <tr>
            <div id="tableHeader"> Information about {name}: </div>
              <br/>
          </tr>
            <tr>
                <td>
              <th>Name: </th>
              <th><strong>{name}</strong></th>
                </td>
            </tr>
            <tr>
              <td>
                <th>Height: </th>
                <th>{height}</th>
              </td>
            </tr>
            <tr>
                <td>
                <th>Weight: </th>
                <th>{weight}</th>
                </td>
            </tr>
            <tr>
                <td>
                <th>Experience: </th>
                <th>{experience}</th>
                </td>
            </tr>
            <tr>
                <td>
                <th>Type: </th>
                <th>{type}</th>
                </td>
            </tr>
            <tr>
                <td>
                <th>Species: </th>
                <th>{species}</th>
                </td>
            </tr>
            <tr>
                <td>
                <th>Abilities: </th>
                <th>{abilities}</th>
                </td>
            </tr>
        </tr>


    );
      return table;
    }
  }

  render(){
    let img = '';
    try{
      if(this.state.apiData.sprites.other.dream_world.front_default!==undefined){
        img =this.state.apiData.sprites.other.dream_world.front_default
      }}catch(exception){
      img='';
    }
    return (
      <div className = 'container'>
        <div className = 'search'>
            <div id='pic'>
                <img src={img} width="350" height="400" ></img>
            </div>
          <h3>Pokemon Search</h3>
          <input type="text" value={this.state.pokemon} onChange = {this.handleChange} placeholder = 'Enter Pokemon Name!'></input>
          <button className="search-button" onClick={this.handleSearchClick}><span> I Choose You! </span></button>
        </div>
        <h4>{this.state.pokemon.name}</h4>
        <table id = "results">
          <tbody>
          {this.generateData()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SearchAPI;

