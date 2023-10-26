import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [shayari, setShayari] = useState("");
  const generateShayari = () => {
    if (keyword !== "") {
      axios
        .get(`https://nice-wasp-threads.cyclic.app/shayari?keyword=${keyword}`)
        .then((res) => {
          console.log(res.data.shayari);
          setShayari(res.data.shayari);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="main">
      <div className="container">
        <h1>Shayari Generator</h1>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={generateShayari}>Generate</button>
        {shayari && <p>{shayari}</p>}
      </div>
    </div>
  );
}

export default App;
