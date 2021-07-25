//import logo from './logo.svg';
//import './App.css';
import React, { Component } from 'react';
import api from './api'

class App extends Component{

  state = {
    dados: [],
  }

async componentDidMount(){
  const response = await api.get('/topchemistry')
 // console.log(response.data);
  this.setState({dados: response.data});
}

  render(){
const {dados} = this.state;
console.log(dados);
    return(
      <div>
      <h1>Listar dados</h1>
      <ul style={{listStyleType: "nome", margin:0, padding:0}}>
        {dados.map(dado => (
          <li key={dado._id}>
            <h2>Título: {dado.titulo}</h2>
            <p>Conteúdo: {dado.conteudo} </p>
          </li>
        ))}
      </ul>
      </div>
    );
  };
};

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Top Chemistry React</h2>

          <a
          className="App-link"
          href="https://www.topchemistry.com.br"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.topchemistry.com.br
        </a>
        <p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a></p>
      </header>
    </div>
  );
}*/

export default App;
