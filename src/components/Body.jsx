import React, { useEffect } from "react";
import axios from "axios";
import Globe from "react-globe.gl";

import globeWrap from "../assets/globewrap.jpg";

const Body = () => {
  useEffect(() => {
    const getISSData = async () => {
      const { data } = await axios.get("http://localhost:6001/getVisibleSats");
      console.log(data);
    };
    getISSData();
  }, []);
  return (
    <>
      <div id="globe">
        <Globe showGraticules={true} globeImageUrl={globeWrap} />
      </div>
    </>
  );
};

export default Body;
