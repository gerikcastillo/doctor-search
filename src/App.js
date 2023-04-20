import Header from "./components/Header";
import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "./assets/icons/search.svg";

function App() {
  const [results, setResults] = useState(null);
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080").then((resp) => {
      console.log(resp.data);
      // setResults(resp.data);
    });
  }, []);

  return (
    <>
      <Header setResults={setResults} />
      <main>
        <div className="header__block">
          <form
            className="header__label"
            onSubmit={(e) => {
              e.preventDefault();
              const searchTerm = e.target.search.value;
              axios
                .get(`http://localhost:8080/search?q=${searchTerm}`)
                .then((resp) => {
                  setResults(resp.data);
                  console.log(resp.data);
                });
            }}
          >
            <img
              className="header__search-icon"
              src={SearchIcon}
              alt="search icon"
            />
            <input
              type="search"
              className="header__search header__search--active"
              placeholder="Search"
              name="search"
            ></input>
            <button type="submit" className="header__button">
              SEARCH
            </button>
          </form>
        </div>
        <section className="data">
          {/* refactor: take out useeffect when setting results */}
          {/* if results is false, then render something else */}
          <article className="card">
            {results ? (
              results.map((result) => (
                <>
                  <div key={result.id}>
                    <h1>{result.name}</h1>
                    <p>Street Address: {result.street}</p>
                    <p>City: {result.city}</p>
                    <p>Postal Code: {result.postalCode}</p>
                    <p>Specialty: {result.specialty}</p>
                  </div>
                </>
              ))
            ) : (
              <div>
                <h2>Find doctors in your area: </h2>
                <h3>Search By:</h3>
              </div>
            )}
            <div>
              <h4>Name</h4>
            </div>
            <div>
              <h4>City/State</h4>
            </div>
            <div>
              <h4>Specialty</h4>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default App;
