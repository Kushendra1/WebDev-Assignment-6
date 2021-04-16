import { useState, useEffect } from "react";
import axios from "axios";
import { pokemon } from "./components/pokemon"
import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (pokemon === "") return;
      let linkToAPI = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

      try {
        let response = await axios.get(linkToAPI);
        setData(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      }
    };
    handleSearch();
  }, [pokemon]);

  const generateData = () => {
    return data.map((id) => {
      return <data key={id.name} {...city} />;
    });
  };

  const handleChange = (e) => {
    setPokemon(e.target.value)
  }

  return {
    <div id="content-wrapper">
      <div id="header">
        <div id="header-text">
          <h1>Pokemon Look-Up</h1>
        </div>
      </div>
        <div id="search-box">
          <label>
            Enter Pokemon:
          </label>
          <input className="search-box-field" placeholder="Enter a zipcode!" type="text" onChange={handleChange} />
        </div>
        {generateData()}
      </div>
  };

}
export default App;
