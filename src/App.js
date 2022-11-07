import React, { useState, useEffect } from "react";
import "./App.css";

import SearchForm from "./SearchBar";
import UserDetails from "./UserDetails";

function App() {
  const [error, setError] = useState(null);

  return (
    <div>
      <div className="navbar">GitHub Search</div>

      <SearchForm />
      {error ? <h1>{error}</h1> : <UserDetails />}
    </div>
  );
}

export default App;
