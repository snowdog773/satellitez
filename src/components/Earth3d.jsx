import Globe from "react-globe.gl";
import globeWrap from "../assets/globewrap.jpg";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { satPositionCalc } from "../utils/satPositionCalc";

const Earth3d = () => {
  const rawTle = useSelector((state) => state.data.iss);
  const [satPosition, setSatPostition] = useState();
  // const [minutes, setMinutes] = useState(0);
  const minutes = useRef(0);
  const globeAttributes = useRef();

  useEffect(() => {
    const globe = globeAttributes.current;
    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let outputArray = [];
      rawTle.forEach((item) => {
        const output = satPositionCalc(item, minutes.current); //converts the raw tle data to lat lng alt
        outputArray.push(output);
      });

      setSatPostition(outputArray);
      minutes.current += 0.1;
    }, 50);
    return () => clearInterval(timer);
  }, [minutes.current]);

  return (
    <>
      {minutes.current}
      <Globe
        ref={globeAttributes}
        // showGraticules={true}
        globeImageUrl={globeWrap}
        objectsData={satPosition} //this data doesn't like coming from redux
        objectLat="lat"
        objectLng="lng"
        objectAltitude="alt"
        objectLabel="name"
        // labelsData={satPosition}
        // labelLat="lat"
        // objectThreeObject={satObject}
      />
    </>
  );
};

export default Earth3d;
