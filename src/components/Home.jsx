import trackingGraphic from "../assets/tracking-graphic.png";
import nightSky from "../assets/night-sky.png";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="inner-container">
          <div className="welcome-text">
            <p>Welcome to Satellitez </p>
            {/* <p>The interactive real time satellite tracker</p> */}
          </div>
          <div className="link-wrapper">
            <div>
              <Link to="/tracking">
                <img className="graphic" src={trackingGraphic} />
                <p className="link-blurb">
                  Get current and predicted future locations of all satellites
                  in Earth orbit
                </p>
                <button className="button-6">START TRACKING</button>
              </Link>
            </div>
            <div>
              <Link to="/events">
                <img className="graphic" src={nightSky} />
                <p className="link-blurb">
                  Get times and dates of visible objects overflying your
                  location
                </p>
                <button className="button-6">GET OVERFLIGHTS</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
