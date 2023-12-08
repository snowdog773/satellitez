import Globe from "react-globe.gl";
import globeWrap from "../assets/globewrap.jpg";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { satPositionCalc } from "../utils/satPositionCalc";
import { setTimePassed } from "../redux/reducers/timerSlice";
import { setTelemetry } from "../redux/reducers/telemetrySlice";

const Earth3d = () => {
  const dispatch = useDispatch();
  const rawTle = useSelector((state) => state.data.data);

  const multiplier = useSelector((state) => state.timer.multiplier);
  const globeRotationSpeed = useSelector(
    (state) => state.timer.globeRotationSpeed
  );

  const [satPosition, setSatPostition] = useState();
  // const [minutes, setMinutes] = useState(0);
  const minutes = useRef(0);
  const globeAttributes = useRef();

  useEffect(() => {
    const globe = globeAttributes.current;
    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = globeRotationSpeed; //0.35;
  }, [globeRotationSpeed]);

  useEffect(() => {
    const timer = setInterval(() => {
      let outputArray = [];
      rawTle.forEach((e) => {
        if (e.name) {
          const output = satPositionCalc(e, minutes.current); //converts the raw tle data to lat lng alt
          outputArray.push(output);
        }
      });
      dispatch(setTimePassed(minutes.current));
      setSatPostition(outputArray);
      const { alt, lng, lat } = outputArray[0];
      const telData = { alt, lng, lat };
      dispatch(setTelemetry(telData));

      minutes.current += multiplier / (60 * 20); //the 20 adjusts for thr loop running 20 times a second
    }, 50);
    return () => clearInterval(timer);
  }, [minutes.current]);

  return (
    <>
      <Globe
        ref={globeAttributes}
        // showGraticules={true}
        globeImageUrl={globeWrap}
        objectsData={satPosition} //this data doesn't like coming from redux
        objectLat="lat"
        objectLng="lng"
        objectAltitude="alt"
        objectLabel="name"
        width={window.innerWidth * 0.8}
        height={window.innerWidth * 0.8}
        // labelsData={satPosition}
        // labelLat="lat"
        // objectThreeObject={satObject}
      />
      <p>Minutes passed :{Math.floor(minutes.current)}</p>
    </>
  );
};

export default Earth3d;
