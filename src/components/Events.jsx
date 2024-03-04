import { useEffect, useState } from "react";
import axios from "axios";
import EventItem from "./EventItem";
import EventFilter from "./EventFilter";
import { apiNoradCall } from "../utils/apiNoradCall";
import { getLocation } from "../utils/getlocation";
import { urlStem } from "../utils/data";
import { calcMasterArray } from "../utils/calcMasterArray";
import { getNightTimeArray } from "../utils/getNightTimeArray";
import { useSelector, useDispatch } from "react-redux";
import {
  setEventData,
  setEventFilter,
  setSingleSearch,
  setIsLastSearchSingle,
} from "../redux/reducers/eventsSlice";
const Events = () => {
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState();

  const [periodHours, setPeriodHours] = useState(1);
  const [nightsArray, setNightsArray] = useState([]);
  const [nightFilter, setNightFilter] = useState(false);
  const [calcTime, setCalcTime] = useState(0);
  ////////////////////////////////////////////////////////
  const visibleSet = useSelector((state) => state.eventData.eventData);
  const groupFilter = useSelector((state) => state.eventData.eventFilter);
  const singleSearch = useSelector((state) => state.eventData.singleSearch);
  const isLastSearchSingle = useSelector(
    (state) => state.eventData.isLastSearchSingle
  );
  ////////////////////USER GEOLOCATION////////////////////////////
  const callGeolocation = async () => {
    const { coords } = await getLocation();

    setCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  useEffect(() => {
    callGeolocation(); //get user location
  }, []);
  /////////////////////////////////////////////////////

  //////////////GET SUNRISE SUNSET LOCAL TIMES????????????????????????
  const refTime = new Date();
  const refTime10DaysAfter = new Date(
    refTime.getTime() + 10 * 24 * 60 * 60 * 1000
  );
  const getDaylightHours = async () => {
    const daylight = await axios.get(
      `https://api.sunrisesunset.io/json?lat=${coordinates.latitude}&lng=$${
        coordinates.longitude
      }&date_start=${refTime.getFullYear()}-${
        refTime.getMonth() + 1
      }-${refTime.getDate()}&date_end=${refTime10DaysAfter.getFullYear()}-${
        refTime10DaysAfter.getMonth() + 1
      }-${refTime10DaysAfter.getDate()}`
    );

    const nights = getNightTimeArray(daylight.data.results);
    nights.pop();

    setNightsArray(nights);
  };

  useEffect(() => {
    coordinates && getDaylightHours();
  }, [coordinates]);
  /////////////////////////////////////////////////

  ////////////////HANDLERS/////////////////////////

  const singleSearchHandler = async (input) => {
    const data = await apiNoradCall(input);

    if (data.length > 0) {
      calcVisible(data);
      dispatch(setSingleSearch(input));
      dispatch(setIsLastSearchSingle(true));
    }
    // dispatch(setEventFilter(data));
  };

  ///////////////CALCULATE OVERFLIGHTS//////////////////////////

  // const getGroupData = async (group) => {
  //   try {
  //     const { data } = await axios.get(`${urlStem}/getSatellites/${group}`);

  //     calcVisible(data);
  //     dispatch(setEventFilter(data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   filterHandler("visual"), [];
  // });

  const calcVisible = async (input = "visual") => {
    let result;
    try {
      if (typeof input !== "object") {
        const { data } = await axios.get(`${urlStem}/getSatellites/${input}`);
        result = data;
      } else {
        result = input;
      }
      // calcVisible(data);
      // dispatch(setEventFilter(data));
      const masterArray = calcMasterArray(
        result,
        coordinates,
        60 * periodHours
      );

      dispatch(setEventData(masterArray.orderedMasterArray));
      setCalcTime(masterArray.calcTime);
      console.log(masterArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("filter useeffect ran");
    coordinates && calcVisible(groupFilter);
  }, [coordinates, periodHours, groupFilter]);
  //////////////////////////////////////////////////////////////////////////
  let outputArray = [];

  if (visibleSet?.length > 0) {
    if (!nightFilter) {
      outputArray = [...visibleSet];
    } else {
      visibleSet.forEach((e, i) => {
        const time = new Date(refTime.getTime() + e.data[0].minutes * 60000);
        nightsArray.some((f) => f.dusk < time && f.dawn > time) &&
          outputArray.push(e);
      });
    }
  }
  return (
    <>
      <div className="home-container">
        <div className="inner-container">
          <div>
            <h2 className="event-heading">Events</h2>
            <p>
              {visibleSet?.length} passes calculated in {calcTime} milliseconds
            </p>
            <div className="controls">
              <label htmlFor="single">
                {" "}
                Single Object Search (name or Norad ID)
              </label>
              <input
                id="single"
                onChange={(e) => singleSearchHandler(e.target.value)}
              />
              <label htmlFor="predictionDays"> Show passes for the next </label>
              <input
                type="number"
                id="predictionDays"
                min="1"
                max="24"
                onChange={(e) => setPeriodHours(e.target.value)}
              ></input>
              <span> hours</span>
              <div>
                <button
                  onClick={() =>
                    nightFilter ? setNightFilter(false) : setNightFilter(true)
                  }
                >
                  {nightFilter ? "Night Filter Off" : "Night Filter On"}
                </button>
              </div>
              <div>
                <EventFilter />
              </div>
            </div>
            <div className="event-content">
              {outputArray.length > 0 ? (
                outputArray.map((e, i, arr) => (
                  <EventItem data={e} refTime={refTime} />
                ))
              ) : (
                <div>show spinner</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
