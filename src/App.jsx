import Header from "./components/Header";
import Body from "./components/Body";

import "./styles/generic.css";
import "./styles/App.css";
import "./styles/home.css";
import "./styles/about.css";
import "./styles/events.css";
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
