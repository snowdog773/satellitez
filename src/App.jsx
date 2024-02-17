import Header from "./components/Header";
import Body from "./components/Body";

import "./generic.css";
import "./App.css";

import SubHeader from "./components/SubHeader";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />

      <Body />
      <div className="absoluteFooter">
        <Footer />
      </div>
    </>
  );
}

export default App;
