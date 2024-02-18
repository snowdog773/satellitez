import { useState } from "react";
import { Link } from "react-router-dom";
import burger from "../assets/burger.svg";
import hiddenBurger from "../assets/hidden-burger.svg";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggle = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };
  return (
    <>
      <div id="header-wrapper">
        <img src={hiddenBurger} className="hidden-burger"></img>
        <h1>SATELLITEZ</h1>

        <div id="menu" onClick={menuToggle}>
          <img src={burger}></img>
        </div>
      </div>
      {isMenuOpen && (
        <div className="menu-hidden-layer" onClick={menuToggle}></div>
      )}
      <ul
        className={
          isMenuOpen ? "main-menu main-menu-show" : "main-menu main-menu-hide"
        }
        onClick={menuToggle}
      >
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
        <li>
          <Link to="/tracking">TRACKING</Link>
        </li>

        <li>
          <Link to="/events">VISIBLE EVENTS</Link>
        </li>
      </ul>

      <p id="header-tagline">Live Satellite Tracking</p>
    </>
  );
};

export default Header;
