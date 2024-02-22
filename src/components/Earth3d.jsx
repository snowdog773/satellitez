import Globe from "react-globe.gl";
import globeWrap from "../assets/globewrap.jpg";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../redux/reducers/dataSlice";
import { satPositionCalc } from "../utils/satPositionCalc";
import { setTimePassed } from "../redux/reducers/timerSlice";
import { setTelemetry } from "../redux/reducers/telemetrySlice";
import { apiNoradCall } from "../utils/apiNoradCall";
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
    let rate;
    rawTle.length > 1000 ? (rate = 1000) : (rate = 50); // reduce renders to 1000ms for data sets over 1000
    const timer = setInterval(() => {
      let outputArray = [];

      rawTle.forEach((e) => {
        if (e.name) {
          const output = satPositionCalc(e, minutes.current); //converts the raw tle data to lat lng alt
          output.noradId = e.noradId; // append noradId for clicking 3d elements
          outputArray.push(output);
        }
      });
      dispatch(setTimePassed(minutes.current));
      setSatPostition(outputArray);
      if (outputArray.length > 0) {
        const { alt, lng, lat } = outputArray[0];
        const telData = { alt, lng, lat };
        dispatch(setTelemetry(telData));
      }
      minutes.current += multiplier / ((60 * 1000) / rate); //the 20 adjusts for thr loop running 20 times a second
    }, rate);
    return () => clearInterval(timer);
  }, [minutes.current]);

  const globeClickHandler = async (input) => {
    const data = await apiNoradCall(input.noradId);

    dispatch(setData(data));
  };
  const aspectRatio = window.innerWidth / window.innerHeight;
  return (
    <>
      {/* <p id="minutes-passed">
        Time passed :{Math.floor(minutes.current)} minutes
      </p> */}
      <Globe
        ref={globeAttributes}
        // showGraticules={true}
        globeImageUrl={globeWrap}
        objectsData={satPosition} //this data doesn't like coming from redux
        objectLat="lat"
        objectLng="lng"
        objectAltitude="alt"
        objectLabel="name"
        width={window.innerWidth}
        height={window.innerHeight * 0.6}
        backgroundColor="#000"
        // rendererSize={window.innerHeight * 0.6}
        onObjectClick={(e) => globeClickHandler(e)}
        // labelsData={satPosition}
        // labelLat="lat"
        // objectThreeObject={satObject}
      />
    </>
  );
};

export default Earth3d;
