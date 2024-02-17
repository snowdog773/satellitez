import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimeMultiplier,
  setGlobeRotationSpeed,
} from "../redux/reducers/timerSlice";
import Footer from "./Footer";

const Timer = () => {
  const dispatch = useDispatch();
  const timeOffset = useSelector((state) => state.timer.timePassed);

  const multiplier = useSelector((state) => state.timer.multiplier);

  const initTime = useRef(new Date(Date.now()));
  const globeSpeed = useSelector((state) => state.timer.globeRotationSpeed);
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
      <div className="timer">
        <div className="timer-inner">
          <div id="time-controls">
            <p>Simulation time : {renderTime.toLocaleString("en-GB")}</p>
            <button
              className={multiplier === 1 ? "activeButton" : undefined}
              onClick={() => timeMultiplierButtonHandler(1)}
            >
              x1
            </button>
            <button
              className={multiplier === 10 ? "activeButton" : undefined}
              onClick={() => timeMultiplierButtonHandler(10)}
            >
              x10
            </button>
            <button
              className={multiplier === 50 ? "activeButton" : undefined}
              onClick={() => timeMultiplierButtonHandler(50)}
            >
              x50
            </button>
            <button
              className={multiplier === 100 ? "activeButton" : undefined}
              onClick={() => timeMultiplierButtonHandler(100)}
            >
              x100
            </button>
            <button
              className={multiplier === 500 ? "activeButton" : undefined}
              onClick={() => timeMultiplierButtonHandler(500)}
            >
              x500
            </button>
            <button
              className={multiplier === 1000 ? "activeButton" : undefined}
              onClick={() => timeMultiplierButtonHandler(1000)}
            >
              x1000
            </button>
          </div>
          <div id="rotateControls">
            <label htmlFor="globeSpeed">Globe Rotation Speed</label>
            <input
              id="globeSpeed"
              type="range"
              min="-10"
              max="10"
              value={globeSpeed}
              onChange={(e) => {
                globeSpeedButtonHandler(e.target.value);
              }}
            ></input>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default Timer;
