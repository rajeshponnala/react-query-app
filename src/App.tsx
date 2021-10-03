import React from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios, { AxiosResponse } from "axios";
import logo from "./logo.svg";
import "./App.css";

function Pokemon() {
  const queryInfo = useQuery("pokemon", async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res: AxiosResponse<any>) => res.data.results);
  }, {
    refetchOnWindowFocus: false
  });
  return (
    <div>
      {queryInfo.isLoading ? (
        <div>loading...</div>
      ) : (
        queryInfo.data.map((result: { name: string }) => (
          <div key={result.name}>{result.name}</div>
        ))
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body>
        <Pokemon/>
        <ReactQueryDevtools/>
      </body>
    </div>
  );
}

export default App;
