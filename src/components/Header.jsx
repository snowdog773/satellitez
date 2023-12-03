import burger from "../assets/burger.svg";
import hiddenBurger from "../assets/hidden-burger.svg";
const Header = () => {
  const openMenu = () => {
    console.log("menu open");
  };
  return (
    <>
      <div id="header-wrapper">
        <img src={hiddenBurger} className="hidden-burger"></img>
        <h1>SATELLITEZ</h1>

        <div id="menu" onClick={openMenu}>
          <img src={burger}></img>
        </div>
      </div>
      <p>Live Satellite Tracker</p>
    </>
  );
};

export default Header;
