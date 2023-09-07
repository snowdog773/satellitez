import burger from "../assets/burger.svg";

const Header = () => {
  const openMenu = () => {
    console.log("menu open");
  };
  return (
    <>
      <div id="header-wrapper">
        <h1>Satellitez</h1>
        <div id="menu" onClick={openMenu}>
          <img src={burger}></img>
        </div>
      </div>
    </>
  );
};

export default Header;
