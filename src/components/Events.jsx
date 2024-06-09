import { useEffect, useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
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
  setHours,
} from "../redux/reducers/eventsSlice";
import NoradEventSearch from "./NoradEventSearch.jsx";
import { satFilters } from "../utils/data";
const Events = () => {
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState();

  // const [periodHours, setPeriodHours] = useState(1);
  const [nightsArray, setNightsArray] = useState([]);
  const [nightFilter, setNightFilter] = useState(false);
  const [calcTime, setCalcTime] = useState(0);
  ////////////////////////////////////////////////////////
  const visibleSet = useSelector((state) => state.eventData.eventData);
  const groupFilter = useSelector((state) => state.eventData.eventFilter);
  const singleSearch = useSelector((state) => state.eventData.singleSearch);
  const periodHours = useSelector((state) => state.eventData.hours);
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
      dispatch(setEventFilter(data));
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

            <div className="controls">
              <div className="eventFilterWrapper">
                <NoradEventSearch /> <EventFilter />
              </div>
              <div className="eventFilterWrapper">
                <button
                  onClick={() =>
                    nightFilter ? setNightFilter(false) : setNightFilter(true)
                  }
                >
                  {nightFilter
                    ? "Disable Night Filter"
                    : "Activate Night Filter"}
                </button>
                <div>
                  <label htmlFor="predictionDays">
                    {" "}
                    Show passes for the next{" "}
                  </label>
                  <input
                    type="number"
                    id="predictionDays"
                    min="1"
                    max="24"
                    value={periodHours}
                    onChange={(e) => dispatch(setHours(e.target.value))}
                  ></input>
                  <span> hours</span>
                </div>
              </div>
            </div>

            <p className="eventCalcTime">
              Currently displaying :{" "}
              {groupFilter && typeof groupFilter === "string" ? (
                <>{satFilters.find((e) => e.query === groupFilter).group}</>
              ) : (
                <>{groupFilter[0].name}</>
              )}
            </p>

            <p className="eventCalcTime">
              {visibleSet?.length} passes calculated in {calcTime} milliseconds
            </p>
            <div className="event-content">
              {outputArray.length > 0 ? (
                outputArray.map((e, i, arr) => (
                  <EventItem data={e} refTime={refTime} />
                ))
              ) : (
                <Bars
                  height="80"
                  width="80"
                  radius="9"
                  color="red"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{ display: "block", margin: " 100px auto" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
