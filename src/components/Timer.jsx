import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimeMultiplier,
  setGlobeRotationSpeed,
} from "../redux/reducers/timerSlice";

const Timer = () => {
  const dispatch = useDispatch();
  const timeOffset = useSelector((state) => state.timer.timePassed);

  const multiplier = useSelector((state) => state.timer.multiplier);

  const initTime = useRef(new Date(Date.now()));

  const renderTime = new Date(
    initTime.current.getTime() + timeOffset * 60 * 1000
  );
  const timeMultiplierButtonHandler = (factor) => {
    dispatch(setTimeMultiplier(factor));
  };

  const globeSpeedButtonHandler = (speed) => {
    dispatch(setGlobeRotationSpeed(speed));
  };
  return (
    <>
      <p>Simulation time : {renderTime.toLocaleString("en-GB")}</p>
      <button onClick={() => timeMultiplierButtonHandler(1)}>x1</button>
      <button onClick={() => timeMultiplierButtonHandler(10)}>x10</button>
      <button onClick={() => timeMultiplierButtonHandler(50)}>x50</button>
      <button onClick={() => timeMultiplierButtonHandler(100)}>x100</button>
      <button onClick={() => timeMultiplierButtonHandler(500)}>x500</button>
      <button onClick={() => timeMultiplierButtonHandler(1000)}>x1000</button>

      <label htmlFor="globeSpeed">Globe Rotation Speed</label>
      <input
        id="globeSpeed"
        type="range"
        min="0"
        max="10"
        onChange={(e) => {
          globeSpeedButtonHandler(e.target.value);
        }}
      ></input>
    </>
  );
};

export default Timer;
