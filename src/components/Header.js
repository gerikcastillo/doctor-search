import "./Header.scss";
import SearchIcon from "../assets/icons/search.svg";
import GooseLogo from "../assets/images/goose-png-27.png";
import axios from "axios"

function Header({setResults}) {
  return (
    <header className="header-container">
      <div className="header">
        <img className="header__logo" src={GooseLogo} alt="search icon" />
        <a className="header__title">DOC DOC GOOSE</a>
      </div>
    </header>
  );
}

export default Header;
