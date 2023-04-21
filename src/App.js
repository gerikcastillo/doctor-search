import Header from "./components/Header";
import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "./assets/icons/search.svg";

import PCP from "./assets/images/4441629.png"
import Eye from "./assets/images/eye2.png"
import Tooth from "./assets/images/tooth2.png"

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
                  <div key={result.id} className="doctors">
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
                <h2>Welcome to DOC DOC GOOSE!</h2>
                <p>We'll help match you with the right specialist!</p>
                <p>Just input your city/state or the specialty care you need to match with a doctor. </p>
                <h3 className="subtitle">Top-searched specialties: </h3>
                <div className="card-wrapper">
                  <div className="card-item">
                    <img src={PCP} className="icon"></img>
                    <h4>Primary Care</h4>
                  </div>
                  <div className="card-item">
                  <img src={Tooth} className="icon"></img>
                    <h4>Dentist</h4>

                  </div>
                  <div className="card-item">
                  <img src={Eye} className="icon"></img>
                    <h4>Eye Doctor</h4>
                  </div>
                </div>
                <div></div>
              </div>
            )}
          </article>
        </section>
        <footer className="footer">
          <h2>Made by Daniel and Gerik!</h2>
          <h5 className="footer__subtitle">and some help from our educators 🧡 </h5>
        </footer>
      </main>
    </>
  );
}

export default App;
