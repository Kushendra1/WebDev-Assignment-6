import { Component } from "react";
import axios from "axios";
import "./App.css";

class SearchAPI extends Component{
  constructor(props){
    super(props);
    this.state={
      apiData: [],
      pokemon: "",
      found: false
    }
  }

  handleChange = (event) => {
    this.setState({pokemon: event.target.value});
  }

  handleSearchClick = async () => {
    let pokemonName = this.state.pokemon;
    let linkToAPI = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName;

    try{
      let response = await axios.get(linkToAPI);
      this.setState({apiData: response.data, found: true});
    }
    catch (error){
      if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        this.setState({found: false});
      }
    }
  }

  generateData = () =>{
    let pokemonData = this.state.apiData;
    let foundResults = this.state.found;
    let typesData = [pokemonData.types];
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
      let type = pokemonData.types.name;
      let abilities = pokemonData.abilities.name;

      table.push(
        <tr key = {pokemonData.id}>
          <td>Height: {height}</td>
          <td>Weight: {weight}</td>
          <td>Experience: {experience}</td>
          <td>Species: {species}</td>
          <td>Type: {type}</td>
          <td>Abilities: {abilities}</td>
        </tr>
      );
      return table;
    }
  }

  render(){
    return (
      <div className = 'container'>
        <div className = 'search'>
          <h3>Pokemon Search</h3>
          <input type="text" value={this.state.pokemon} onChange = {this.handleChange} placeholder = 'Enter Pokemon Name!'></input>
          <button className="search-button" onClick={this.handleSearchClick}>I Choose You!</button>
        </div>
        <br/>
        <h4>{this.state.pokemon.name}</h4>
        <table id = "data">
          <tbody>
          {this.generateData()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SearchAPI;

