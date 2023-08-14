import { FiSearch } from "react-icons/fi";
import "./styles.css";
import React, { useState } from "react";
import api from "./services/api"; 

function App() {
  
  const [input, setInput] = React.useState(null);
  const [cep, setCep] = React.useState({});
  
  const handleCHange = (event) => {
    setInput(event.target.value);
    // console.log(event.target.value)
  };
  
  //48685000/json/
  async function handleSearch (event) {

    if (input === "") {
      alert("Preencha com algum CEP")
      return;
    };

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data);
      setInput("");

    }catch {
      alert("Erro ao buscar o CEP, verifique se digitou corretamente...");
      setInput("");
    };
  };
  
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite seu CEP..." 
        onChange={handleCHange}
        />
        <button className="btnSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {/* VErificando se tem algo dentro do Obj */}
      {Object.keys(cep).length > 0 && ( 
      <main className="main">
        <h2>CEP: { cep.cep }</h2>
        <span>Rua: { cep.logradouro }</span>
        <span>Complemento: {cep.complemento } </span>
        <span>Bairro: {cep.bairro} </span>
        <span> {cep.localidade} - {cep.uf}</span>
      </main>
      )}
    </div>
  );
}

export default App;
