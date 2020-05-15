import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo Repositório ${Date.now()}`,
      url: `http://www.github.com/${Date.now()}`,
      techs: ["node", "react", "React Native"],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const index = repositories.findIndex(
      (repositories) => id === repositories.id
    );
    const repositoriesUpdaded = repositories.splice(index, 1);
    setRepositories([...repositories, repositoriesUpdaded]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          if (repository.id) {
            return (
              <li key={repository.id}>
                {repository.title}

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            );
          }
          return console.log();
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
