import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import api from './services/api';


import './App.css';
import backgroundImage from './assets/background.png';

/**
 * // Conceitos importantes:
 * // Componente
 * // Propriedade
 * // Imutabilidade
 */


export default function App(){
  const [ projects, setProjects ] = useState([]);
  
  // useState retorna um array com 2 posicoes
  // 
  // 1. variavel com seu valor inicial 
  // 2. função para atualizacao deste valor 

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function addNewProject() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Rubens Guimarães"
    });

    const project = response.data;

    console.log(project);

    setProjects([...projects, project]); // spread operator
	
	// Logo abaixo, dentro do return temos o exemplo do fragment <>

  }

  return (
    <>
      <img width={200} src={backgroundImage} />
      <Header title="Projects">
        <ul>
          {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </ul>
      </Header>
      <button type="button" onClick={addNewProject}>Adicionar Projeto</button>
    </>
  );
}