import * as React from "react";

import "./App.css";
import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState(" ");
  const [api, setApi] = useState({});
 

  const handleSearch = async (e) => {
    e.preventDefault();
    if (api === "") return;
    const endpoint = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=15&prop=extracts|pageimages&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=${search}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();

    setApi(json.query.pages);
  };
  return (
    <div className="App">
      <header>
        <h1>Wiki App</h1>
        <form className="searchField" onSubmit={handleSearch}>
          <input placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>
      </header> 
      <div className="lists">
        {Object.entries(api).map(([key, item], i) => {
          const url = `https://en.wikipedia.org/?curid=${item.pageid}`
          return (
            <div className="list" key={i}>
              <h3>{item.title}</h3>

              <p>{item.extract}</p>
              <a href={url}>Read more</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
